function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{ticket.title}</h2>
        <p><strong>Description :</strong> {ticket.description}</p>
        <p><strong>Status :</strong> {ticket.status}</p>
        <p><strong>Priorité :</strong> {ticket.priority}</p>
        <p><strong>Tags :</strong> {ticket.tags.join(", ")}</p>
        <p><strong>Date :</strong> {ticket.createdAt}</p>

        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

export default TicketModal;