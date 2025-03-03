// DataTableComponent.tsx
import { useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import { columns, data } from "../data";
import SidebarFilter from "./SidebarFilter";
import SearchAndPagination from "./SearchAndPagination";
import Table from "./Table";

DataTable.use(DT);

export default function DataTableComponent() {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [filteredData, setFilteredData] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const applyFilters = (search: string, filters: string[], month: string, year: string) => {
    let result = data;

    if (filters.length > 0) {
      result = result.filter((row) =>
        filters.some((filter) => new RegExp(filter.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&"), "i").test(row.audience))
      );
    }

    if (month) {
      result = result.filter((row) => new Date(row.date).getMonth() + 1 === parseInt(month));
    }

    if (year) {
      result = result.filter((row) => new Date(row.date).getFullYear().toString() === year);
    }

    if (search) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(search)
        )
      );
    }

    setFilteredData(result);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setSearchTerm("");
    setSelectedMonth("");
    setSelectedYear("");
    setFilteredData(data);
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid d-flex">
      <SidebarFilter 
        selectedFilters={selectedFilters} 
        setSelectedFilters={setSelectedFilters} 
        applyFilters={applyFilters} 
        searchTerm={searchTerm} 
        filterOptions={["Change agents", "Compensation advisors", "Timekeepers", "Section 34 managers", "Employees"]} 
        selectedMonth={selectedMonth} 
        setSelectedMonth={setSelectedMonth} 
        selectedYear={selectedYear} 
        setSelectedYear={setSelectedYear} 
        resetFilters={resetFilters}
      />
      <div className="flex-grow-1 p-3">
        <SearchAndPagination 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          applyFilters={(search, filters) => applyFilters(search, filters, selectedMonth, selectedYear)} 
          selectedFilters={selectedFilters} 
          entriesPerPage={entriesPerPage} 
          setEntriesPerPage={setEntriesPerPage} 
        />
        <Table 
          data={filteredData} 
          columns={columns} 
          expandedRows={expandedRows} 
          toggleRow={toggleRow} 
          entriesPerPage={entriesPerPage} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </div>
  );
}