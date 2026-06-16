SELECT
  user_id,
  host_name,
  host_country,
  is_business,
  property_count,
  ROUND(avg_base_price, 2) AS avg_base_price,
  ROUND(total_listing_value, 2) AS total_listing_value,
  ROUND(avg_max_guests, 1) AS avg_max_guests
FROM bricks_medallion.`gold-bricks`.host_property_summary
ORDER BY property_count DESC, total_listing_value DESC
LIMIT 100;
