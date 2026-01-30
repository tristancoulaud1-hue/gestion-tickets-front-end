import { useEffect, useState } from "react";
import { fetchTickets, deleteTicket, updateTicket } from "../services/api";
import TicketItem from "./TicketItem";
import TicketFilters from "./TicketFilters";
import Pagination from "./Pagination";
import TicketModal from "./TicketModal";
import SuppModal from "./SuppModal";
import { DndContext, closestCenter } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const statuses = ["Open", "In progress", "Done"];
      
      const baseFilters = {};
      if (priority) baseFilters.priority = priority;
      if (search) baseFilters.search = search;
      if (sortBy) {
        baseFilters.sortBy = sortBy;
        baseFilters.order = sortOrder;
      }

      const responses = await Promise.all(
        statuses.map(s => fetchTickets({ 
          ...baseFilters,
          status: s, 
          page: page, 
          limit: 3
        }))
      );

      const allTickets = responses.flatMap(r => r.data || []); 
      setTickets(allTickets);

      const maxPages = Math.max(...responses.map(r => r.pages || 1));
      setTotalPages(maxPages);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des colonnes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [status, priority, search, sortBy, sortOrder]);

  useEffect(() => {
    loadTickets();
  }, [refresh, status, priority, search, sortBy, sortOrder, page]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?");
    if (!confirmDelete) return;
    await deleteTicket(id);
    loadTickets();
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateTicket(id, { status: newStatus });
    loadTickets();
  };

  const toggleOrder = () => {
    setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
  };

  const handleConfirmDelete = async (id) => {
  await deleteTicket(id);
  setTicketToDelete(null);
  loadTickets();
  };

  const handleDragEnd = async (event) => {
  const { active, over } = event;

  if (!over) return;

  const ticketId = active.id;
  let newStatus = over.id;

  const overTicket = tickets.find(t => t.id === over.id);
  if (overTicket) {
    newStatus = overTicket.status;
  }

  const authorizedStatuses = ["Open", "In progress", "Done"];
  
  if (authorizedStatuses.includes(newStatus)) {
    const currentTicket = tickets.find(t => t.id === ticketId);
    if (currentTicket && currentTicket.status !== newStatus) {
      await handleStatusChange(ticketId, newStatus);
    }
  }
};

  const columns = {
    "Open": (tickets || []).filter(t => t.status === "Open"),
    "In progress": (tickets || []).filter(t => t.status === "In progress"),
    "Done": (tickets || []).filter(t => t.status === "Done"),
  };

  return (
    <div>
      <h2>Liste des tickets</h2>

      <TicketFilters
        status={status}
        priority={priority}
        setPriority={setPriority}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        toggleOrder={toggleOrder}
      />

        {loading && <p>Chargement des tickets...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && tickets.length === 0 && <p>Aucun ticket trouvé.</p>}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {Object.entries(columns).map(([statusName, columnTickets]) => (
            <KanbanColumn
              key={statusName}
              status={statusName}
              tickets={columnTickets}
              onDelete={setTicketToDelete}
              onStatusChange={handleStatusChange}
              onOpen={setSelectedTicket}
            />
          ))}
        </div>
      </DndContext>

      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />

      <SuppModal
        ticket={ticketToDelete}
        onClose={() => setTicketToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
}

export default TicketList;

