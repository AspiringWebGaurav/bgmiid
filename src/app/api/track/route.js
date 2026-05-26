// import sql from "@/app/api/utils/sql";
import { db, isFirebaseConfigured } from "@/utils/firebase-admin";

function getIP(request) {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function getDeviceType(ua = "") {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua))
    return "Mobile";
  return "Desktop";
}

// Simple in-memory rate limit: ip → last tracked timestamp
const recentIPs = new Map();
const COOLDOWN_MS = 30 * 60 * 1000; // 30 min per IP

export async function POST(request) {
  try {
    const ip = getIP(request);
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";

    // Rate limit: don't log same IP within 30 mins
    if (ip !== "unknown") {
      const last = recentIPs.get(ip);
      if (last && Date.now() - last < COOLDOWN_MS) {
        return Response.json({ ok: true, skipped: true });
      }
      recentIPs.set(ip, Date.now());
      // Prune old entries to avoid memory leak
      if (recentIPs.size > 10000) {
        const cutoff = Date.now() - COOLDOWN_MS;
        for (const [k, v] of recentIPs) {
          if (v < cutoff) recentIPs.delete(k);
        }
      }
    }

    const body = await request.json().catch(() => ({}));
    const page = body.page || "/";
    const deviceType = getDeviceType(userAgent);

    // Skip bots / crawlers
    if (
      /bot|crawler|spider|scraper|curl|python|wget|go-http/i.test(userAgent)
    ) {
      return Response.json({ ok: true, skipped: true });
    }

    // Geo lookup via ip-api.com (free, no key needed, 45 req/min)
    let geo = {};
    if (
      ip !== "unknown" &&
      ip !== "127.0.0.1" &&
      !ip.startsWith("192.168") &&
      !ip.startsWith("10.")
    ) {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,isp,timezone,lat,lon`,
          { signal: AbortSignal.timeout(3000) },
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success") {
            geo = {
              country: geoData.country || null,
              country_code: geoData.countryCode || null,
              region: geoData.regionName || null,
              city: geoData.city || null,
              isp: geoData.isp || null,
              timezone: geoData.timezone || null,
              latitude: geoData.lat || null,
              longitude: geoData.lon || null,
            };
          }
        }
      } catch {
        // Geo lookup failed silently — still log visit
      }
    }

    if (isFirebaseConfigured && db) {
      await db.collection("visits").add({
        ip,
        country: geo.country ?? "Unknown",
        country_code: geo.country_code ?? "XX",
        region: geo.region ?? null,
        city: geo.city ?? null,
        isp: geo.isp ?? null,
        timezone: geo.timezone ?? null,
        latitude: geo.latitude ?? null,
        longitude: geo.longitude ?? null,
        page,
        user_agent: userAgent.slice(0, 300),
        referrer: referer.slice(0, 300) || null,
        device_type: deviceType,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log("[track] Firebase not configured. Skipping visit log.");
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[track]", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
