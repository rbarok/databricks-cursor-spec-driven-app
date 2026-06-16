SELECT
  host_country AS country,
  COUNT(*) AS host_count,
  SUM(property_count) AS total_properties,
  ROUND(AVG(avg_base_price), 2) AS avg_base_price
FROM bricks_medallion.`gold-bricks`.host_property_summary
GROUP BY host_country
ORDER BY host_count DESC
LIMIT 15;
