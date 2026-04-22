create table if not exists restaurant_tables (
  id text primary key,
  name text not null,
  capacity integer not null check (capacity > 0),
  created_at timestamptz not null default now()
);

create table if not exists reservations (
  id text primary key,
  guest_name text not null,
  guest_phone text,
  guest_count integer not null check (guest_count > 0),
  reservation_date date not null,
  reservation_time text not null,
  duration_minutes integer not null default 120,
  status text not null default 'booked',
  table_id text references restaurant_tables(id) on delete set null,
  notes text,
  source text not null default 'web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reservations_date_time_idx
on reservations (reservation_date, reservation_time);

insert into restaurant_tables (id, name, capacity)
values
  ('t1', 'Tisch 1', 2),
  ('t2', 'Tisch 2', 4),
  ('t3', 'Tisch 3', 4),
  ('t4', 'Tisch 4', 6)
on conflict (id) do nothing;
