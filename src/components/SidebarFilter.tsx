// SidebarFilter.tsx
import React from "react";

type SidebarFilterProps = {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
  applyFilters: (search: string, filters: string[], month: string, year: string) => void;
  searchTerm: string;
  filterOptions: string[];
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  applyFilters,
  searchTerm,
  filterOptions,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  resetFilters,
}) => {
  const handleFilterChange = (category: string) => {
    setSelectedFilters((prev) => {
      const updatedFilters = prev.includes(category)
        ? prev.filter((s) => s !== category)
        : [...prev, category];
      applyFilters(searchTerm, updatedFilters, selectedMonth, selectedYear);
      return updatedFilters;
    });
  };

  return (
    <aside className="p-3 border-end" style={{ width: "250px", minHeight: "100vh" }}>
      <h5 className="mb-3">Filter by Audience</h5>
      {filterOptions.map((category) => (
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
      
      <h5 className="mt-3">Filter by Date</h5>
      <div className="mb-2">
        <label className="form-label">Month</label>
        <select
          className="form-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Year</label>
        <select
          className="form-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={(new Date().getFullYear() - i).toString()}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-secondary w-100 mt-3" onClick={resetFilters}>
        Reset Filters
      </button>
    </aside>
  );
};

export default SidebarFilter;
