SELECT COUNT(*) AS counter_addition_count FROM counterdb.counter_addition ca
    WHERE ca.counter_id = $1;
