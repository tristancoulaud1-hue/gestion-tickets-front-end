import { useDroppable } from '@dnd-kit/core';
import TicketItem from './TicketItem';

function KanbanColumn({ status, tickets, onDelete, onStatusChange, onOpen }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="kanban-column">
      <h3>{status} ({tickets.length})</h3>
      <ul>
        {tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onOpen={onOpen}
          />
        ))}
      </ul>
    </div>
  );
}

export default KanbanColumn;