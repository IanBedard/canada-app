import { useState, useEffect } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import { columns, data } from "../data";
import SidebarFilter from "./SidebarFilter";
import SearchAndPagination from "./SearchAndPagination";
import Table from "./Table";

DataTable.use(DT);

export default function DataTableComponent() {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isSingleEntryView, setIsSingleEntryView] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    
    if (idParam) {
      // If ID is provided, filter to show only that entry
      const singleEntry = data.filter(row => row.id === parseInt(idParam));
      setFilteredData(singleEntry);
      setIsSingleEntryView(true);
      // Clear other filters
      setSelectedCategories([]);
      setSelectedAudiences([]);
      setSearchTerm('');
      setSelectedMonth('');
      setSelectedYear('');
    } else {
      // Normal filter handling
      const categoryParam = params.get('category');
      const audienceParam = params.get('audience');
      const monthParam = params.get('month');
      const yearParam = params.get('year');
      const searchParam = params.get('search');
      
      const categories = categoryParam ? categoryParam.split(',') : [];
      const audiences = audienceParam ? audienceParam.split(',') : [];
      
      if (categoryParam) setSelectedCategories(categories);
      if (audienceParam) setSelectedAudiences(audiences);
      if (monthParam) setSelectedMonth(monthParam);
      if (yearParam) setSelectedYear(yearParam);
      if (searchParam) setSearchTerm(searchParam);
    
      if (categoryParam || audienceParam || monthParam || yearParam || searchParam) {
        applyFilters(
          searchParam || '',
          categories,
          audiences,
          monthParam || '',
          yearParam || ''
        );
      }
    }
  }, []); // Run once when component mounts

  const clearSingleEntry = () => {
    // Remove id from URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    window.history.pushState({}, '', url);
    
    // Reset to normal view
    setFilteredData(data);
    setIsSingleEntryView(false);
    resetFilters();
  };


  const applyFilters = (
    search: string, 
    categories: string[], 
    audiences: string[], 
    month: string, 
    year: string
  ) => {
    // Check if we're in single entry view
    if (isSingleEntryView) return;

    let result = data;

    if (categories.length > 0) {
      result = result.filter((row) => categories.includes(row.category));
    }

    if (audiences.length > 0) {
      result = result.filter((row) =>
        Array.isArray(row.audience) &&
        row.audience.some((audienceItem) =>
          audiences.some((selectedAudience) =>
            new RegExp(selectedAudience.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&"), "i").test(audienceItem)
          )
        )
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
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFilteredData(result);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedAudiences([]);
    setSearchTerm("");
    setSelectedMonth("");
    setSelectedYear("");
    setFilteredData(data);
    setCurrentPage(1);
  };

  const categoryOptions = Array.from(new Set(data.map(item => item.category)));
  const audienceOptions = Array.from(
    new Set(data.flatMap(item => item.audience))
  );

 

  return (
    <div className="container-fluid d-flex">
      {!isSingleEntryView && (
        <SidebarFilter 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedAudiences={selectedAudiences}
          setSelectedAudiences={setSelectedAudiences}
          applyFilters={applyFilters}
          searchTerm={searchTerm}
          categoryOptions={categoryOptions}
          audienceOptions={audienceOptions}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      )}
      <div className="flex-grow-1 p-3">
        {isSingleEntryView ? (
          <div className="container">
          <div className="mb-3">
            <button 
              className="btn btn-primary"
              onClick={clearSingleEntry}
            >
              Back to full list
            </button>
          </div>
          {filteredData.map((entry) => (
            <div key={entry.id} className="card">
              <div className="card-header">
                <h4>{entry.title}</h4>
                <div className="text-muted">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h5>What you need to know:</h5>
                  <p>{entry.what}</p>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Category:</strong> {entry.category}
                  </div>
                  <div className="col-md-6">
                    <strong>Audience:</strong>{' '}
                    {Array.isArray(entry.audience) ? entry.audience.join(', ') : entry.audience}
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Action Required:</strong>
                  <p>{entry.action}</p>
                </div>

                <div className="mb-3">
                  <strong>Notes:</strong>
                  <p>{entry.notes}</p>
                </div>

                <div className="mb-3">
                  <strong>Resources:</strong>
                  <p>{entry.resources}</p>
                </div>

                <div className="mb-3">
                  <strong>Who to Contact:</strong>
                  <p>{entry.who}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <>
          <SearchAndPagination 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            applyFilters={(search) => 
              applyFilters(search, selectedCategories, selectedAudiences, selectedMonth, selectedYear)
            }
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            resetFilters={resetFilters}
          />
          <Table 
            data={filteredData}
            columns={columns}
            entriesPerPage={entriesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
        )}
      </div>
    </div>
  );
}