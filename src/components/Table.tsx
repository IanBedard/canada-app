import React, { useState } from "react";
import { Modal } from 'react-bootstrap';

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
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const copyLink = async (row: any) => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const searchParams = new URLSearchParams();
      searchParams.set('id', row.id.toString());
      const shareableUrl = `${baseUrl}?${searchParams.toString()}`;
      
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedId(row.id);
      // Reset the button after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setShowModal(true);
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
            <tr key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
              <td>{row.title}</td>
              <td>
                {new Date(row.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td onClick={(e) => e.stopPropagation()}>
  <div className="btn-group">
    <button
      className="btn btn-primary btn-sm share"
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

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRow?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div className="p-3">
              <div className="mb-4">
                <h5>What you need to know:</h5>
                <p>{selectedRow.what}</p>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Category:</strong> {selectedRow.category}
                </div>
                <div className="col-md-6">
                  <strong>Date:</strong>{' '}
                  {new Date(selectedRow.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div className="mb-3">
                <strong>Audience:</strong>{' '}
                {Array.isArray(selectedRow.audience) ? (
                  selectedRow.audience.join(', ')
                ) : (
                  selectedRow.audience
                )}
              </div>

              <div className="mb-3">
                <strong>Action Required:</strong>
                <p>{selectedRow.action}</p>
              </div>

              <div className="mb-3">
                <strong>Notes:</strong>
                <p>{selectedRow.notes}</p>
              </div>

              <div className="mb-3">
                <strong>Resources:</strong>
                <p>{selectedRow.resources}</p>
              </div>

              <div className="mb-3">
                <strong>Who to Contact:</strong>
                <p>{selectedRow.who}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Pagination Controls */}
      {entriesPerPage !== 0 && (
        <nav>
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Table;
