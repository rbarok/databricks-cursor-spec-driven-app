SELECT
  country,
  user_count,
  property_count,
  payment_count,
  COALESCE(total_revenue, 0) AS total_revenue
FROM bricks_medallion.`gold-bricks`.country_metrics
ORDER BY user_count DESC
LIMIT 15;
