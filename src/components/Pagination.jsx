function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page === 1}>
        ⬅️ Précédent
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button onClick={onNext} disabled={page === totalPages}>
        Suivant ➡️
      </button>
    </div>
  );
}

export default Pagination;