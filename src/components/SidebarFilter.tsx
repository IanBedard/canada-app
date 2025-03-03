import { useState } from "react";

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
    <aside className="p-3 border-end" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="accordion" id="filterAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button ${openAccordion === "category" ? "" : "collapsed"}`}
              onClick={() => toggleAccordion("category")}
            >
              Filter by Category
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === "category" ? "show" : ""}`}>
            <div className="accordion-body">
              {categoryOptions.map((category) => (
                <div key={category} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className="form-check-label" htmlFor={`category-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button ${openAccordion === "audience" ? "" : "collapsed"}`}
              onClick={() => toggleAccordion("audience")}
            >
              Filter by Audience
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === "audience" ? "show" : ""}`}>
            <div className="accordion-body">
              {audienceOptions.map((audience) => (
                <div key={audience} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`audience-${audience}`}
                    checked={selectedAudiences.includes(audience)}
                    onChange={() => handleAudienceChange(audience)}
                  />
                  <label className="form-check-label" htmlFor={`audience-${audience}`}>{audience}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button 
              className={`accordion-button ${openAccordion === "date" ? "" : "collapsed"}`}
              onClick={() => toggleAccordion("date")}
            >
              Filter by Date
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${openAccordion === "date" ? "show" : ""}`}>
            <div className="accordion-body">
              <div className="mb-3">
                <label className="form-label">Month</label>
                <select className="form-select" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="">All</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Year</label>
                <select className="form-select" value={selectedYear} onChange={handleYearChange}>
                  <option value="">All</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
