import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


function TicketItem({ ticket, onDelete, onStatusChange, onOpen }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className="ticket-item" 
      onClick={() => onOpen(ticket)}
    >
      <strong>{ticket.title}</strong>
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
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
        >
          <option>Open</option>
          <option>In progress</option>
          <option>Done</option>
        </select>

        <button onClick={(e) => { e.stopPropagation(); onDelete(ticket.id); }}>
          ❌
        </button>
      </div>
    </li>
  );
}

export default TicketItem;