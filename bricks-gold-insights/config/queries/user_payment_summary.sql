SELECT
  user_id,
  name,
  country,
  user_type,
  completed_payments,
  ROUND(total_paid, 2) AS total_paid,
  ROUND(avg_payment_amount, 2) AS avg_payment_amount,
  last_payment_date
FROM bricks_medallion.`gold-bricks`.user_payment_summary
ORDER BY total_paid DESC
LIMIT 100;
