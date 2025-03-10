import React, { useState } from "react";

type SortOrder = 'asc' | 'desc' | null;
interface SortConfig {
  key: string;
  direction: SortOrder;
}

interface TableProps {
  data: any[];
  columns: { title: string }[];
  entriesPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

}

const Table: React.FC<TableProps> = ({ data, columns, entriesPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });

  const copyLink = async (row: any) => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const searchParams = new URLSearchParams();
      searchParams.set('id', row.id.toString());
      const shareableUrl = `${baseUrl}?${searchParams.toString()}`;
      
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedId(row.id);
      // Reset the button after 1 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 1000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const sortData = (data: any[], key: string, direction: SortOrder) => {
    if (!direction) return data;

    return [...data].sort((a, b) => {
      if (key === 'date') {
        const dateA = new Date(a[key]).getTime();
        const dateB = new Date(b[key]).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key: string) => {
    let direction: SortOrder = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
  };

  const sortedData = sortData(data, sortConfig.key, sortConfig.direction);
  const paginatedData = entriesPerPage === 0 
    ? sortedData 
    : sortedData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <>
      <div className="mb-2">
        <strong>Found {data.length} records</strong>
      </div>

      <table id="example" className="table table-striped table-hover w-100">
      <thead>
  <tr>
    <th 
      onClick={() => handleSort('title')} 
      style={{ cursor: 'pointer', width: '60%' }}
    >
      Title {' '}
      <i className={`bi ${
        sortConfig.key === 'title'
          ? `bi-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'}`
          : 'bi-sort-down-alt'
      }`}></i>
    </th>
    <th 
      onClick={() => handleSort('date')} 
      style={{ cursor: 'pointer', width: '20%' }}
    >
      Date {' '}
      <i className={`bi ${
        sortConfig.key === 'date'
          ? `bi-sort-${sortConfig.direction === 'asc' ? 'up' : 'down'}`
          : 'bi-sort-down-alt'
      }`}></i>
    </th>
    <th style={{ width: '20%' }}>Actions</th>
  </tr>
</thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>
                {new Date(row.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td>
  <div className="btn-group">
    <button
      className="btn btn-primary btn-sm share blue-button"
      onClick={() => {
        const url = new URL(window.location.href);
        url.searchParams.set('id', row.id.toString());
        window.location.href = url.toString();
      }}
    >
      <i className="bi bi-eye"></i>
    </button>
    <button
      className={`btn btn-sm ${copiedId === row.id ? 'btn-success share' : 'btn-outline-secondary share'}`}
      onClick={() => copyLink(row)}
    >
      <i className={`bi ${copiedId === row.id ? 'bi-check-lg' : 'bi-link-45deg'}`}></i>
    </button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
    
{entriesPerPage !== 0 && totalPages > 1 && (
  <nav className="wb-tables-pagination" role="navigation">
    <ul className="pagination mrgn-tp-md">
      <li className={`${currentPage === 1 ? "disabled" : ""}`}>
        <a 
          href="#" 
          className="btn btn-default" 
          rel="prev"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          aria-label="Previous page"
        >
          <span className="glyphicon glyphicon-chevron-left"></span>
          <span className="wb-inv">Previous</span>
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index} className={currentPage === index + 1 ? "active" : ""}>
          <a
            href="#"
            className="btn btn-default"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(index + 1);
            }}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </a>
        </li>
      ))}
      <li className={`${currentPage === totalPages ? "disabled" : ""}`}>
        <a 
          href="#" 
          className="btn btn-default" 
          rel="next"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          aria-label="Next page"
        >
          <span className="glyphicon glyphicon-chevron-right"></span>
          <span className="wb-inv">Next</span>
        </a>
      </li>
    </ul>
  </nav>
)}
    </>
  );
};

export default Table;
