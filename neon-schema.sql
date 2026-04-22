CREATE TABLE IF NOT EXISTS restaurant_tables (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  guest_count INTEGER NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL,
  notes TEXT,
  source TEXT NOT NULL,
  table_id TEXT REFERENCES restaurant_tables(id),
  staff_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reservations ADD COLUMN IF NOT EXISTS staff_name TEXT;

INSERT INTO restaurant_tables (id, name, capacity)
VALUES
  ('t1', 'T01', 2),
  ('t2', 'T02', 4),
  ('t3', 'T03', 4),
  ('t4', 'T04', 6),
  ('t5', 'T05', 2),
  ('t6', 'T06', 4)
ON CONFLICT (id) DO NOTHING;
