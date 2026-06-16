SELECT
  (SELECT COUNT(*) FROM bricks_medallion.`gold-bricks`.country_metrics) AS country_count,
  (SELECT SUM(user_count) FROM bricks_medallion.`gold-bricks`.country_metrics) AS total_users,
  (SELECT SUM(property_count) FROM bricks_medallion.`gold-bricks`.country_metrics) AS total_properties,
  (SELECT SUM(payment_count) FROM bricks_medallion.`gold-bricks`.country_metrics) AS total_payments,
  (SELECT COALESCE(SUM(total_revenue), 0) FROM bricks_medallion.`gold-bricks`.country_metrics) AS total_revenue,
  (SELECT COUNT(*) FROM bricks_medallion.`gold-bricks`.host_property_summary) AS host_count,
  (SELECT COUNT(*) FROM bricks_medallion.`gold-bricks`.user_payment_summary) AS paying_user_count;
