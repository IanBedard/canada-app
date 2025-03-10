import { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import "@cdssnc/gcds-components";
import "@cdssnc/gcds-components/dist/gcds/gcds.css";
import { GcdsHeading, GcdsLink, GcdsContainer, GcdsText, GcdsDateModified } from "@cdssnc/gcds-components-react";

interface SidebarFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedAudiences: string[];
  setSelectedAudiences: (audiences: string[]) => void;
  applyFilters: (
    search: string, 
    categories: string[], 
    audiences: string[],
    month: string, 
    year: string
  ) => void;
  searchTerm: string;
  categoryOptions: string[];
  audienceOptions: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  resetFilters: () => void; // Add this new prop
}

export default function SidebarFilter({
  selectedCategories,
  setSelectedCategories,
  selectedAudiences,
  setSelectedAudiences,
  applyFilters,
  searchTerm,
  categoryOptions,
  audienceOptions,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  resetFilters,
}: SidebarFilterProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    applyFilters(
      searchTerm, 
      updatedCategories, 
      selectedAudiences, 
      selectedMonth, 
      selectedYear
    );
  };

  const handleAudienceChange = (audience: string) => {
    const updatedAudiences = selectedAudiences.includes(audience)
      ? selectedAudiences.filter((a) => a !== audience)
      : [...selectedAudiences, audience];
  
    setSelectedAudiences(updatedAudiences);
    applyFilters(
      searchTerm, 
      selectedCategories, 
      updatedAudiences,
      selectedMonth, 
      selectedYear
    );
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
    applyFilters(searchTerm, selectedCategories, selectedAudiences, month, selectedYear);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);
    applyFilters(searchTerm, selectedCategories, selectedAudiences, selectedMonth, year);
  };

  return (
    <aside className="wb-sec">
      <div className="wb-filter-header">
        <GcdsHeading tag="h4"><FilterAltIcon/> Filters</GcdsHeading>
        <button 
          className="btn btn-default btn-sm"
          onClick={resetFilters}
        >
          <span className="glyphicon glyphicon-refresh"></span> Reset
        </button>
      </div>
      
      <div className="wb-filter">
        <details className="wb-filter-section" open={openAccordion === "category"}>
          <summary onClick={() => toggleAccordion("category")}>
            Filter by Category
          </summary>
          <div className="wb-filter-content">
            {categoryOptions.map((category) => (
              <div key={category} className="checkbox">
                <label htmlFor={`category-${category}`}>
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              </div>
            ))}
          </div>
        </details>

        <details className="wb-filter-section" open={openAccordion === "audience"}>
          <summary onClick={() => toggleAccordion("audience")}>
            Filter by Audience
          </summary>
          <div className="wb-filter-content">
            {audienceOptions.map((audience) => (
              <div key={audience} className="checkbox">
                <label htmlFor={`audience-${audience}`}>
                  <input
                    type="checkbox"
                    id={`audience-${audience}`}
                    checked={selectedAudiences.includes(audience)}
                    onChange={() => handleAudienceChange(audience)}
                  />
                  {audience}
                </label>
              </div>
            ))}
          </div>
        </details>

        <details className="wb-filter-section" open={openAccordion === "date"}>
          <summary onClick={() => toggleAccordion("date")}>
            Filter by Date
          </summary>
          <div className="wb-filter-content">
            <div className="form-group">
              <label htmlFor="month-select">Month</label>
              <select 
                className="form-control"
                id="month-select"
                value={selectedMonth} 
                onChange={handleMonthChange}
              >
                <option value="">All</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mrgn-tp-md">
              <label htmlFor="year-select">Year</label>
              <select 
                className="form-control"
                id="year-select"
                value={selectedYear} 
                onChange={handleYearChange}
              >
                <option value="">All</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </details>
      </div>
    </aside>
  );
}
