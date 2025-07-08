import React from 'react';
import './index.css';

const Pagination = ({ totalItems, currentPage, pageSize, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
    onPageChange(1);
  };

  const startPage = currentPage;
  const endPage = Math.min(currentPage + 1, totalPages);
  const pagesToShow = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="pagination-bar">
      <span className="range-text">
        {(currentPage - 1) * pageSize + 1}–
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
      </span>

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="nav-arrow"
      >
        &lt;
      </button>

      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'page-btn active' : 'page-btn'}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="nav-arrow"
      >
        &gt;
      </button>

      <select
        className="page-size-dropdown"
        value={pageSize}
        onChange={handlePageSizeChange}
      >
        <option value={10}>10 / Page</option>
        <option value={50}>50 / Page</option>
        <option value={100}>100 / Page</option>
      </select>
    </div>
  );
}

export default Pagination;

