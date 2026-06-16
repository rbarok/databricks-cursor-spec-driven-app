SELECT
  country,
  COALESCE(total_revenue, 0) AS total_revenue,
  payment_count
FROM bricks_medallion.`gold-bricks`.country_metrics
WHERE COALESCE(total_revenue, 0) > 0
ORDER BY total_revenue DESC
LIMIT 15;
