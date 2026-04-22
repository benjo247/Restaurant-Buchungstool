export default function StatusBadge({ status }: { status: string }) {
  const labelMap: Record<string, string> = {
    booked: "Gebucht",
    seated: "Eingetroffen",
    finished: "Erledigt",
    no_show: "No-Show",
  };

  return <span className={`badge ${status}`}>{labelMap[status] ?? status}</span>;
}
