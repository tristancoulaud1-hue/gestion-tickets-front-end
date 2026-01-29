import { useEffect, useState } from "react";
import { fetchTickets, deleteTicket, updateTicket } from "../services/api";
import TicketItem from "./TicketItem";
import TicketFilters from "./TicketFilters";
import Pagination from "./Pagination";
import TicketModal from "./TicketModal";
import SuppModal from "./SuppModal";

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
  try {
    setLoading(true);
    setError(null);

    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (search) filters.search = search;
    if (sortBy) {
      filters.sortBy = sortBy;
      filters.order = sortOrder;
    }

    filters.page = page;
    filters.limit = 5;

    const data = await fetchTickets(filters);

    setTickets(data.data ||[]);
    setTotalPages(data.pages ||1);
  } catch (err) {
    setError("Erreur lors du chargement des tickets");
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

  return (
    <div>
      <h2>Liste des tickets</h2>

      <TicketFilters
        status={status}
        setStatus={setStatus}
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

      <ul>
        {tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onDelete={() => setTicketToDelete(ticket)}
            onStatusChange={handleStatusChange}
            onOpen={setSelectedTicket}
          />
        ))}
      </ul>
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

