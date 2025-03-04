import { useState, useEffect } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import { columns, data } from "../data";
import SidebarFilter from "./SidebarFilter";
import SearchAndPagination from "./SearchAndPagination";
import Table from "./Table";
import { GcdsButton } from "@cdssnc/gcds-components-react";

DataTable.use(DT);

export default function DataTableComponent() {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
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
      setExpandedRows(prev => ({
        ...prev,
        [parseInt(idParam)]: true
      }));
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
    setExpandedRows({});
    setIsSingleEntryView(false);
    resetFilters();
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
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

  const handleShare = async (item: any) => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const searchParams = new URLSearchParams();
      
      // Only include the ID for sharing specific entries
      searchParams.set('id', item.id.toString());
      const shareableUrl = `${baseUrl}?${searchParams.toString()}`;

      const shareMessage = `View Technical Communication: ${item.title}\n` +
        `Category: ${item.category}\n` +
        `Date: ${item.date}`;

      if (navigator.share) {
        await navigator.share({
          title: 'Technical Communications',
          text: shareMessage,
          url: shareableUrl
        });
      } else {
        await navigator.clipboard.writeText(shareableUrl);
        alert('Shareable link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

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
          <div className="mb-3">
            <button 
              className="btn btn-primary"
              onClick={clearSingleEntry}
            >
              Back to full list
            </button>
          </div>
        ) : (
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
        )}
        <Table 
          data={filteredData}
          columns={columns}
          expandedRows={expandedRows}
          toggleRow={toggleRow}
          entriesPerPage={entriesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleShare={handleShare}
        />
      </div>
    </div>
  );
}