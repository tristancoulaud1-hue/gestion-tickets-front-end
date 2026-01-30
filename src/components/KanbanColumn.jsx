import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TicketItem from './TicketItem';

function KanbanColumn({ status, tickets, onDelete, onStatusChange, onOpen }) {
  const { setNodeRef } = useDroppable({id: status,});

  return (
    <div ref={setNodeRef} className="kanban-column">
      <h3>{status} ({tickets.length})</h3>

      <SortableContext items={(tickets || []).map(t => t.id)} strategy={verticalListSortingStrategy}>
        <ul style={{ minHeight: '100px' }}>
            {tickets && tickets.map((ticket) => (
                <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    onOpen={onOpen}
                />
            ))}
        </ul>
      </SortableContext>
    </div>
  );
}

export default KanbanColumn;