import React from "react";

interface SearchAndPaginationProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  applyFilters: (search: string) => void;
  entriesPerPage: number;
  setEntriesPerPage: (entries: number) => void;
  resetFilters: () => void;
}

const SearchAndPagination: React.FC<SearchAndPaginationProps> = ({
  searchTerm,
  setSearchTerm,
  applyFilters,
  entriesPerPage,
  setEntriesPerPage,
  resetFilters,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    applyFilters(term);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">

   <div className="d-flex w-100">
  <div className="flex-grow-1 me-2">
    <input
      type="text"
      className="form-control w-100"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
    />
  </div>
  <button className="btn btn-outline-secondary">Reset</button>
</div>

      {/*<div>
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
      </div>*/}
    </div>
  );
};

export default SearchAndPagination;