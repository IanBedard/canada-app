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

  const handleReset = () => {
    setSearchTerm('');
    resetFilters();
  };

  return (
    <div className="mrgn-bttm-md">
      <div className="row">
        <div className="col-md-8">
          <div className="form-inline">
            <div className="input-group">
              <input
                type="search"
                className="form-control wb-srch-q"
                placeholder="Search in table..."
                value={searchTerm}
                onChange={handleSearch}
                aria-label="Search in table"
              />
              <button
                className="btn btn-default mrgn-lft-sm"
                type="button"
                onClick={handleReset}
              >
                <span className="glyphicon glyphicon-refresh"></span>
                <span className="wb-inv">Reset search</span>
              </button>
            </div>
          </div>
        </div>
        {/* Uncomment if you want to add the entries per page selector
        <div className="col-md-4">
          <div className="form-inline">
            <label className="mrgn-rght-sm">Show</label>
            <select
              className="form-control"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={0}>All</option>
            </select>
            <span className="mrgn-lft-sm">entries</span>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default SearchAndPagination;