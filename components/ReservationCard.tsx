import { StatusBadge } from "@/components/StatusBadge";

type ReservationCardProps = {
  guestName: string;
  guestCount: number;
  tableName?: string | null;
  phone?: string | null;
  notes?: string | null;
  status: string;
  startTime: string;
};

export function ReservationCard(props: ReservationCardProps) {
  const time = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(props.startTime));

  return (
    <article className="card reservation-card">
      <div className="reservation-row">
        <div>
          <p className="time">{time}</p>
          <h3>{props.guestName}</h3>
          <p className="muted">
            {props.guestCount} Personen{props.tableName ? ` · ${props.tableName}` : ""}
          </p>
          {props.phone ? <p className="muted">{props.phone}</p> : null}
          {props.notes ? <p className="notes">{props.notes}</p> : null}
        </div>
        <StatusBadge status={props.status} />
      </div>
      <div className="action-row">
        <button className="secondary-button" type="button">
          Eingetroffen
        </button>
        <button className="secondary-button" type="button">
          Bearbeiten
        </button>
      </div>
    </article>
  );
}
