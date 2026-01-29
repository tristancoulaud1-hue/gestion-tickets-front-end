function TicketFilters({
  status, setStatus,
  priority, setPriority,
  search, setSearch,
  sortBy, setSortBy,
  sortOrder, toggleOrder
}) {
  return (
    <div className="filters">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Tous les statuts</option>
        <option>Open</option>
        <option>In progress</option>
        <option>Done</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Trier par...</option>
        <option value="createdAt">Date</option>
        <option value="title">Titre</option>
        <option value="priority">Priorité</option>
      </select>

      <button onClick={toggleOrder}>
        {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
      </button>
    </div>
  );
}

export default TicketFilters;