import sql from "@/app/api/utils/sql";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bgmi-admin-2026";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get("pw");

  if (pw !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalRows,
      todayRows,
      yesterdayRows,
      countryRows,
      deviceRows,
      dailyRows,
      recentRows,
      hourlyRows,
    ] = await sql.transaction([
      // Total all-time visits
      sql`SELECT COUNT(*) AS total FROM visits`,

      // Visits today
      sql`SELECT COUNT(*) AS total FROM visits WHERE visited_at >= NOW() AT TIME ZONE 'UTC' - INTERVAL '24 hours'`,

      // Visits yesterday window
      sql`SELECT COUNT(*) AS total FROM visits
          WHERE visited_at >= NOW() AT TIME ZONE 'UTC' - INTERVAL '48 hours'
            AND visited_at <  NOW() AT TIME ZONE 'UTC' - INTERVAL '24 hours'`,

      // Top countries
      sql`SELECT country, country_code, COUNT(*) AS visits
          FROM visits
          GROUP BY country, country_code
          ORDER BY visits DESC
          LIMIT 20`,

      // Device breakdown
      sql`SELECT device_type, COUNT(*) AS visits
          FROM visits
          GROUP BY device_type
          ORDER BY visits DESC`,

      // Daily trend last 30 days
      sql`SELECT DATE(visited_at AT TIME ZONE 'UTC') AS day,
                 COUNT(*) AS visits
          FROM visits
          WHERE visited_at >= NOW() - INTERVAL '30 days'
          GROUP BY day
          ORDER BY day ASC`,

      // Recent 50 visitors
      sql`SELECT id, ip, country, country_code, city, region, isp,
                 device_type, page, referrer, visited_at
          FROM visits
          ORDER BY visited_at DESC
          LIMIT 50`,

      // Hourly for today (last 24h)
      sql`SELECT DATE_TRUNC('hour', visited_at AT TIME ZONE 'UTC') AS hour,
                 COUNT(*) AS visits
          FROM visits
          WHERE visited_at >= NOW() - INTERVAL '24 hours'
          GROUP BY hour
          ORDER BY hour ASC`,
    ]);

    const total = parseInt(totalRows[0]?.total || 0);
    const today = parseInt(todayRows[0]?.total || 0);
    const yesterday = parseInt(yesterdayRows[0]?.total || 0);
    const growth =
      yesterday > 0
        ? Math.round(((today - yesterday) / yesterday) * 100)
        : null;

    return Response.json({
      overview: { total, today, yesterday, growth },
      countries: countryRows,
      devices: deviceRows,
      daily: dailyRows,
      hourly: hourlyRows,
      recent: recentRows,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[admin/stats]", err);
    return Response.json({ error: "DB error" }, { status: 500 });
  }
}
