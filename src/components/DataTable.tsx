import { useState, useEffect } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import { columns, data } from "../data"; 

DataTable.use(DT);

export default function DataTableComponent() {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle row expansion
  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtering function
  const handleFilterChange = (category: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(category)
        ? prev.filter((s) => s !== category)
        : [...prev, category];

      applyFilters(searchTerm, updatedFilters);
      return updatedFilters;
    });
  };

  // Search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, selectedFilters);
  };

  // Apply search and filters
  const applyFilters = (search: string, filters: string[]) => {
    let result = data;

    if (filters.length > 0) {
      result = result.filter((row) => filters.includes(row.category));
    }

    if (search) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(search)
        )
      );
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page on new filter/search
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = entriesPerPage === 0 ? filteredData : filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="container-fluid d-flex">
      {/* Sidebar Filter */}
      <aside className="p-3 border-end" style={{ width: "250px", minHeight: "100vh" }}>
        <h5 className="mb-3">Filter by Category</h5>
        {["News", "Update", "Alert"].map((category) => (
          <div key={category} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={category}
              checked={selectedFilters.includes(category)}
              onChange={() => handleFilterChange(category)}
            />
            <label className="form-check-label" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </aside>

      {/* DataTable Section */}
      <div className="flex-grow-1 p-3">
        {/* Search and Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div>
            <label className="me-2">Show</label>
            <select
              className="form-select d-inline w-auto"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={0}>All</option>
            </select>
            <span className="ms-2">entries</span>
          </div>
        </div>

        {/* DataTable with expandable rows */}
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
              <>
                <tr key={row.id}>
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
              </>
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
      </div>
    </div>
  );
}
