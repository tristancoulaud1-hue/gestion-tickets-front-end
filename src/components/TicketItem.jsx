function TicketItem({ ticket, onDelete, onStatusChange, onOpen }) {
  return (
    <li className="ticket-item" onClick={()=> onOpen(ticket)}>
      <strong>{ticket.title}</strong>
      <span className={`badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
  {ticket.status}
        </span>
        <span className={`badge priority-${ticket.priority.toLowerCase()}`}>
        {ticket.priority}
        </span>

      <select
        value={ticket.status}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onStatusChange(ticket.id, e.target.value)}
      >
        <option>Open</option>
        <option>In progress</option>
        <option>Done</option>
      </select>

      <button onClick={() => onDelete(ticket.id)}>
        ❌ Supprimer
      </button>
    </li>
  );
}

export default TicketItem;