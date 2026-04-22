type Props = {
  status: string;
};

const labels: Record<string, string> = {
  booked: "Gebucht",
  seated: "Eingetroffen",
  finished: "Abgeschlossen",
  no_show: "No-show",
};

export default function StatusBadge({ status }: Props) {
  const label = labels[status] || status;
  return <span className={`status-badge status-${status}`}>{label}</span>;
}
