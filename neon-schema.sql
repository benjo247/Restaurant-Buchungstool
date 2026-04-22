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
  status TEXT NOT NULL DEFAULT 'booked',
  notes TEXT,
  source TEXT NOT NULL DEFAULT 'web',
  table_id TEXT REFERENCES restaurant_tables(id),
  staff_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reservations ADD COLUMN IF NOT EXISTS staff_name TEXT;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS table_id TEXT;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS guest_phone TEXT;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'web';

INSERT INTO restaurant_tables (id, name, capacity)
VALUES
  ('t1', 'Tisch 1', 2),
  ('t2', 'Tisch 2', 4),
  ('t3', 'Tisch 3', 6),
  ('t4', 'Tisch 4', 2),
  ('t5', 'Tisch 5', 4),
  ('t6', 'Tisch 6', 4)
ON CONFLICT (id) DO NOTHING;
