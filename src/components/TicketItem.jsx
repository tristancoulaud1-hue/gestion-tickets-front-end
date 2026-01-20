function TicketItem({ ticket, onDelete, onStatusChange }) {
  return (
    <li className="ticket-item">
      <strong>{ticket.title}</strong>
      <span>{ticket.status}</span>
      <span>{ticket.priority}</span>

      <select
        value={ticket.status}
        onChange={(e) => onStatusChange(ticket.id, e.target.value)}
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <button onClick={() => onDelete(ticket.id)}>
        ❌ Supprimer
      </button>
    </li>
  );
}

export default TicketItem;