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
      const singleEntry = data.filter(row => row.id.toString() === idParam);
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
    let filtered = [...data];

    if (categories.length > 0) {
      filtered = filtered.filter(item => categories.includes(item.category));
    }

    if (audiences.length > 0) {
      filtered = filtered.filter(item => 
        audiences.every(audience => item.audience.includes(audience))
      );
    }

    if (month) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return (itemDate.getMonth() + 1).toString() === month;
      });
    }

    if (year) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear().toString() === year;
      });
    }

    if (search) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Remove duplicates by using object ID
    const uniqueFiltered = filtered.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    );

    setFilteredData(uniqueFiltered);
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
          resetFilters={resetFilters}
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
      <h4>{entry.title || 'Untitled'}</h4>
      {entry.date && (
        <div className="text-muted">
          {new Date(entry.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
    </div>
    <div className="card-body">
      {entry.what && (
        <div className="mb-4">
          <h5>What you need to know:</h5>
          <div dangerouslySetInnerHTML={{ __html: entry.what }} />
        </div>
      )}

      <div className="row mb-3">
        {entry.category && (
          <div className="col-md-6">
            <strong>Category:</strong> {entry.category}
          </div>
        )}
        {entry.audience && (
          <div className="col-md-6">
            <strong>Audience:</strong>{' '}
            {Array.isArray(entry.audience) ? entry.audience.join(', ') : entry.audience}
          </div>
        )}
      </div>

      {entry.action && (
        <div className="mb-3">
          <strong>Action Required:</strong>
          <div dangerouslySetInnerHTML={{ __html: entry.action }} />
        </div>
      )}

      {entry.notes && (
        <div className="mb-3">
          <strong>Notes:</strong>
          <div dangerouslySetInnerHTML={{ __html: entry.notes }} />
        </div>
      )}

      {entry.resources && (
        <div className="mb-3">
          <strong>Resources:</strong>
          <div dangerouslySetInnerHTML={{ __html: entry.resources }} />
        </div>
      )}

      {entry.who && (
        <div className="mb-3">
          <strong>Who to Contact:</strong>
          <div dangerouslySetInnerHTML={{ __html: entry.who }} />
        </div>
      )}
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