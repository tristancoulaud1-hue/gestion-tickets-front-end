import { useEffect, useState } from "react";
import { fetchTickets, deleteTicket, updateTicket } from "../services/api";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const loadTickets = () => {
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (search) filters.search = search;
    if (sortBy) filters.sortBy = sortBy;

    fetchTickets(filters).then((data) => {
      setTickets(data.data);
    });
  };

  useEffect(() => {
    loadTickets();
  }, [refresh,status, priority, search, sortBy]);

  const handleDelete = async (id) => {
    await deleteTicket(id);
    loadTickets();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateTicket(id, { status: newStatus });
    loadTickets();
  };return (
    <div>
      <h2>Liste des tickets</h2>

      <div style={{ marginBottom: "15px" }}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option>Open</option>
          <option>In progress</option>
          <option>Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Toutes les priorités</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="text"
          placeholder="Recherche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ marginLeft: "10px" }}
            >
            <option value="">Trier par</option>
            <option value="createdAt">Date de création (ascendante)</option>
            <option value="title">Titre (A-Z)</option>
            <option value="priority">Priorité (Low à High)</option>
        </select>

      </div>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> — {ticket.status} — {ticket.priority}

            <select
              value={ticket.status}
              onChange={(e) =>
                handleStatusChange(ticket.id, e.target.value)
              }
              style={{ marginLeft: "10px" }}
            >
              <option>Open</option>
              <option>In progress</option>
              <option>Done</option>
            </select>

            <button
              onClick={() => handleDelete(ticket.id)}
              style={{ marginLeft: "10px" }}
            >
              ❌ Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;