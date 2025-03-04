// Table.tsx
import React, { useState } from "react";

interface TableProps {
  data: any[];
  columns: { title: string }[];
  expandedRows: { [key: number]: boolean };
  toggleRow: (id: number) => void;
  entriesPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleShare: (item: any) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, expandedRows, toggleRow, entriesPerPage, currentPage, setCurrentPage, handleShare }) => {
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const paginatedData = entriesPerPage === 0 ? data : data.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const [copiedId, setCopiedId] = useState<number | null>(null);

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
  return (
    <>
            <div className="mb-2">
  <strong>Found {data.length} records</strong>
</div>

      <table id="example" className="table table-striped table-hover w-100">
      <thead>
  <tr>
    <th>Expand</th>
    {columns.slice(0, 4).map((col, index) => (
      <th key={index}>{col.title}</th>
    ))}
    <th>Actions</th>  {/* Add this line */}
  </tr>
</thead>
        <tbody>
  {paginatedData.map((row) => (
    <React.Fragment key={row.id}>
      <tr>
        <td>
          <button
            className="expand-btn btn btn-sm btn-outline-primary"
            onClick={() => toggleRow(row.id)}
          >
            {expandedRows[row.id] ? "−" : "+"}
          </button>
        </td>
        <td>{row.title}</td>
        <td>{row.category}</td>
        <td>{row.date}</td>
        <td>
          {Array.isArray(row.audience) ? (
            <ul className="m-0 p-0" style={{ listStyleType: "none" }}>
              {row.audience.map((audienceItem: string, index: number) => (
                <li key={index}>{audienceItem}</li>
              ))}
            </ul>
          ) : (
            row.audience
          )}
        </td>
        
        <td>
        <div className="btn-group">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleShare(row)}
          >
            <i className="bi bi-share"></i> Share
          </button>
          <button
            className={`btn btn-sm ${copiedId === row.id ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => copyLink(row)}
          >
            <i className={`bi ${copiedId === row.id ? 'bi-check-lg' : 'bi-link-45deg'}`}></i>
            {copiedId === row.id ? ' Link copied' : ' Copy Link'}
          </button>
        </div>
      </td>
      </tr>
      {expandedRows[row.id] && (
        <tr className="bg-light">
          <td colSpan={6}>
            <div className="p-3">
              <strong>What you need to know:</strong> {row.what}
              <br />
              <strong>Action Required:</strong> {row.action}
              <br />
              <strong>Notes:</strong> {row.notes}
              <br />
              <strong>Resources:</strong> {row.resources}
              <br />
              <strong>Who to Contact:</strong> {row.who}
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  ))}
</tbody>


      </table>

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
