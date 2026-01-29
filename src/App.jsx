import { useState } from "react";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleTicketCreated = () => {
    setRefresh(!refresh);
    setIsFormOpen(false);
  };

  return (
    <div className="container">
      <div className="header-container">
        <h1>🎫 Ticket Manager</h1>
        <button 
          className={`btn-toggle ${isFormOpen ? 'btn-close' : 'btn-open'}`}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "❌ Fermer le formulaire" : "➕ Nouveau Ticket"}
        </button>
      </div>
      {isFormOpen && (
        <div className="form-wrapper">
          <TicketForm onTicketCreated={handleTicketCreated} />
        </div>
      )}

      <TicketList refresh={refresh} />
    </div>
  );
}

export default App;