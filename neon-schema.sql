CREATE TABLE IF NOT EXISTS restaurant_tables (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0)
);

CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'booked',
  notes TEXT,
  source TEXT NOT NULL DEFAULT 'web',
  table_id TEXT REFERENCES restaurant_tables(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO restaurant_tables (id, name, capacity)
VALUES
  ('t1', 'Tisch 1', 2),
  ('t2', 'Tisch 2', 4),
  ('t3', 'Tisch 3', 4),
  ('t4', 'Tisch 4', 6)
ON CONFLICT (id) DO NOTHING;
