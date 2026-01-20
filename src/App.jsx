import { useState } from "react";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTicketCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Ticket Manager</h1>
      <TicketForm onTicketCreated={handleTicketCreated} />
      <TicketList refresh={refresh} />
    </div>
  );
}

export default App;