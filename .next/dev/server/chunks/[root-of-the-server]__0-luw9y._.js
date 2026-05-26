module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/utils/firebase-admin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAuth",
    ()=>adminAuth,
    "db",
    ()=>db,
    "default",
    ()=>__TURBOPACK__default__export__,
    "isFirebaseConfigured",
    ()=>isFirebaseConfigured
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs, [project]/node_modules/firebase-admin)");
;
const isFirebaseConfigured = !!process.env.FIREBASE_SERVICE_ACCOUNT || !!process.env.GOOGLE_APPLICATION_CREDENTIALS || !!process.env.FIREBASE_PROJECT_ID;
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].apps.length) {
    try {
        // Attempt to parse service account from environment variables if present
        const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
        let serviceAccount;
        if (serviceAccountStr) {
            serviceAccount = JSON.parse(serviceAccountStr);
        } else {
            console.warn("[Firebase] Service account missing. Skipping Firebase initialization for local dev.");
        }
        if (serviceAccount) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].initializeApp({
                credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].credential.cert(serviceAccount),
                databaseURL: "https://bgmiidservices.firebaseio.com"
            });
        } else if (isFirebaseConfigured) {
            // Initialize with application default credentials if available
            __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].initializeApp();
        }
    } catch (error) {
        console.error('Firebase admin initialization error', error.message);
    }
}
const db = isFirebaseConfigured ? __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].firestore() : null;
const adminAuth = isFirebaseConfigured ? __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].auth() : null;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"];
}),
"[project]/src/app/api/track/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
// import sql from "@/app/api/utils/sql";
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/firebase-admin.js [app-route] (ecmascript)");
;
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
    if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return "Mobile";
    return "Desktop";
}
// Simple in-memory rate limit: ip → last tracked timestamp
const recentIPs = new Map();
const COOLDOWN_MS = 30 * 60 * 1000; // 30 min per IP
async function POST(request) {
    try {
        const ip = getIP(request);
        const userAgent = request.headers.get("user-agent") || "";
        const referer = request.headers.get("referer") || "";
        // Rate limit: don't log same IP within 30 mins
        if (ip !== "unknown") {
            const last = recentIPs.get(ip);
            if (last && Date.now() - last < COOLDOWN_MS) {
                return Response.json({
                    ok: true,
                    skipped: true
                });
            }
            recentIPs.set(ip, Date.now());
            // Prune old entries to avoid memory leak
            if (recentIPs.size > 10000) {
                const cutoff = Date.now() - COOLDOWN_MS;
                for (const [k, v] of recentIPs){
                    if (v < cutoff) recentIPs.delete(k);
                }
            }
        }
        const body = await request.json().catch(()=>({}));
        const page = body.page || "/";
        const deviceType = getDeviceType(userAgent);
        // Skip bots / crawlers
        if (/bot|crawler|spider|scraper|curl|python|wget|go-http/i.test(userAgent)) {
            return Response.json({
                ok: true,
                skipped: true
            });
        }
        // Geo lookup via ip-api.com (free, no key needed, 45 req/min)
        let geo = {};
        if (ip !== "unknown" && ip !== "127.0.0.1" && !ip.startsWith("192.168") && !ip.startsWith("10.")) {
            try {
                const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,isp,timezone,lat,lon`, {
                    signal: AbortSignal.timeout(3000)
                });
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
                            longitude: geoData.lon || null
                        };
                    }
                }
            } catch  {
            // Geo lookup failed silently — still log visit
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFirebaseConfigured"] && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$firebase$2d$admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].collection("visits").add({
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
        return Response.json({
            ok: true
        });
    } catch (err) {
        console.error("[track]", err);
        return Response.json({
            ok: false
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-luw9y._.js.map