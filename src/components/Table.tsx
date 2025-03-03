// Table.tsx
import React from "react";

interface TableProps {
  data: any[];
  columns: { title: string }[];
  expandedRows: { [key: number]: boolean };
  toggleRow: (id: number) => void;
  entriesPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Table: React.FC<TableProps> = ({ data, columns, expandedRows, toggleRow, entriesPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const paginatedData = entriesPerPage === 0 ? data : data.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <>
      <table id="example" className="table table-striped table-hover w-100">
        <thead>
          <tr>
            <th>Expand</th>
            {columns.slice(0, 4).map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                <td>
                  <button className="expand-btn btn btn-sm btn-outline-primary" onClick={() => toggleRow(row.id)}>
                    {expandedRows[row.id] ? "−" : "+"}
                  </button>
                </td>
                <td>{row.title}</td>
                <td>{row.category}</td>
                <td>{row.date}</td>
                <td>{row.audience}</td>
              </tr>
              {expandedRows[row.id] && (
                <tr className="bg-light">
                  <td colSpan={5}>
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
