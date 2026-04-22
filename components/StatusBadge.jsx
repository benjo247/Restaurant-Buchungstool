export default function StatusBadge({ status }) {
  const map = {
    booked: 'status-booked',
    seated: 'status-seated',
    finished: 'status-finished',
    no_show: 'status-no-show'
  };

  return <span className={`status-badge ${map[status] || 'status-booked'}`}>{status}</span>;
}
