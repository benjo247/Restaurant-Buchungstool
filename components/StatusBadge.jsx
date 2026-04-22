const statusConfig = {
  booked: { label: 'Gebucht', className: 'status-booked' },
  seated: { label: 'Eingetroffen', className: 'status-seated' },
  finished: { label: 'Erledigt', className: 'status-finished' },
  no_show: { label: 'No-Show', className: 'status-no-show' }
};

export default function StatusBadge({ status }) {
  const item = statusConfig[status] || statusConfig.booked;
  return <span className={`status-badge ${item.className}`}>{item.label}</span>;
}
