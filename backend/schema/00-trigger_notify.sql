DROP FUNCTION trigger_notify() CASCADE;

CREATE OR REPLACE FUNCTION trigger_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify(CAST('insert' AS text), row_to_json(NEW)::text);
    ELSIF TG_OP = 'UPDATE' THEN
      PERFORM pg_notify(CAST('update' AS text), row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
