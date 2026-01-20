import { useEffect, useState } from "react";
import { fetchTickets, deleteTicket, updateTicket } from "../services/api";
import TicketItem from "./TicketItem";
import TicketFilters from "./TicketFilters";
import Pagination from "./Pagination";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTickets = () => {
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

    fetchTickets(filters).then((data) => {
      setTickets(data.data || []);
      setTotalPages(data.pages || 1);
    });
  };

  useEffect(() => {
    setPage(1);
  }, [status, priority, search, sortBy, sortOrder]);

  useEffect(() => {
    loadTickets();
  }, [refresh, status, priority, search, sortBy, sortOrder, page]);

  const handleDelete = async (id) => {
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

      <ul>
        {tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>

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

