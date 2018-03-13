CREATE TABLE IF NOT EXISTS accounts (
  account_id SERIAL PRIMARY KEY UNIQUE,
  active BOOLEAN DEFAULT TRUE,
  email TEXT,
  name TEXT
);

CREATE TRIGGER before_insert_accounts_trigger BEFORE INSERT ON accounts FOR EACH ROW EXECUTE PROCEDURE trigger_notify();
CREATE TRIGGER update_accounts_trigger AFTER UPDATE ON accounts FOR EACH ROW EXECUTE PROCEDURE trigger_notify();
CREATE TRIGGER after_delete_accounts_trigger AFTER DELETE ON accounts FOR EACH ROW EXECUTE PROCEDURE trigger_notify();
