import React from 'react';

function Pagination({ currentPage, pageCount, handlePageChange }) {
  const pageNumbers = [];
  const maxPageNumbers = 5;
  let startPage, endPage;

  if (pageCount <= maxPageNumbers) {
    startPage = 1;
    endPage = pageCount;
  } else {
    if (currentPage <= Math.ceil(maxPageNumbers / 2)) {
      startPage = 1;
      endPage = maxPageNumbers;
    } else if (currentPage + Math.floor(maxPageNumbers / 2) >= pageCount) {
      startPage = pageCount - maxPageNumbers + 1;
      endPage = pageCount;
    } else {
      startPage = currentPage - Math.floor(maxPageNumbers / 2);
      endPage = currentPage + Math.floor(maxPageNumbers / 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleFirstPageClick = () => {
    handlePageChange(1);
  };

  const handleLastPageClick = () => {
    handlePageChange(pageCount);
  };

  const handlePageNumberClick = (pageNumber) => {
    handlePageChange(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <>
            <li className="page-item">
              <a className="page-link" href="#" onClick={handleFirstPageClick}>First</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handlePageNumberClick(currentPage - 1)}>Prev</a>
            </li>
          </>
        )}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item${currentPage === pageNumber ? ' active' : ''}`}>
            <a className="page-link" href="#" onClick={() => handlePageNumberClick(pageNumber)}>{pageNumber}</a>
          </li>
        ))}
        {currentPage < pageCount && (
          <>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handlePageNumberClick(currentPage + 1)}>Next</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={handleLastPageClick}>Last</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
