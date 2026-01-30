import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TicketItem({ ticket, onDelete, onStatusChange, onOpen }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li 
      ref={setNodeRef} 
      style={style} 
      className="ticket-item"
      onClick={() => onOpen(ticket)}
    >
      <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
        <strong>{ticket.title}</strong>
      </div>

      <div className="ticket-badges">
        <span className={`status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
          {ticket.status}
        </span>
        <span className={`priority-${ticket.priority.toLowerCase()}`}>
          {ticket.priority}
        </span>
      </div>

      <div className="ticket-actions" onPointerDown={(e) => e.stopPropagation()}>
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
        >
          <option>Open</option>
          <option>In progress</option>
          <option>Done</option>
        </select>
        <button onClick={(e) => { e.stopPropagation(); onDelete(ticket.id); }}>❌</button>
      </div>
    </li>
  );
}

export default TicketItem;