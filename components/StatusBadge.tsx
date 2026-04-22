const statusMap: Record<string, string> = {
  booked: "status-booked",
  seated: "status-seated",
  finished: "status-finished",
  no_show: "status-no-show",
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge ${statusMap[status] ?? "status-booked"}`}>{status}</span>;
}
