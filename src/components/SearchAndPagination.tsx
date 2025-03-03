// SearchAndPagination.tsx
import React from "react";

interface SearchAndPaginationProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  applyFilters: (search: string, filters: string[]) => void;
  selectedFilters: string[];
  entriesPerPage: number;
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchAndPagination: React.FC<SearchAndPaginationProps> = ({ searchTerm, setSearchTerm, applyFilters, selectedFilters, entriesPerPage, setEntriesPerPage }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, selectedFilters);
  };

  return (
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
  );
};

export default SearchAndPagination;
