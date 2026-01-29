function SuppModal({ ticket, onClose, onConfirm }) {
  if (!ticket) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>⚠️ Confirmation de suppression</h3>
        <div style={{ margin: "15px 0" }}> {/* Un conteneur pour aérer */}
            <p style={{ marginBottom: "8px", color: "#666" }}>
                Voulez-vous vraiment supprimer le ticket :
            </p>
            <strong style={{ fontSize: "1.1rem", display: "block", color: "#2c3e50" }}>
                {ticket.title}
            </strong>
        </div>
        
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={onClose} className="btn-secondary">
            Annuler
          </button>
          <button 
            onClick={() => onConfirm(ticket.id)} 
            className="btn-danger"
            style={{ backgroundColor: "#ff4d4d", color: "white" }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuppModal;