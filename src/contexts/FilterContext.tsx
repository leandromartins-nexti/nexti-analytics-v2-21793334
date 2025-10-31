import { createContext, useContext, useState, ReactNode } from "react";

interface FilterValue {
  category: string;
  value: string;
  label: string;
}

interface FilterContextType {
  filters: FilterValue[];
  addFilter: (filter: FilterValue) => void;
  removeFilter: (filter: FilterValue) => void;
  clearFilters: () => void;
  hasFilters: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterValue[]>([]);

  const addFilter = (filter: FilterValue) => {
    setFilters((prev) => {
      // Check if filter already exists
      const exists = prev.some(
        (f) => f.category === filter.category && f.value === filter.value
      );
      if (exists) {
        // Remove if already selected (toggle)
        return prev.filter(
          (f) => !(f.category === filter.category && f.value === filter.value)
        );
      }
      // Add new filter
      return [...prev, filter];
    });
  };

  const removeFilter = (filter: FilterValue) => {
    setFilters((prev) =>
      prev.filter(
        (f) => !(f.category === filter.category && f.value === filter.value)
      )
    );
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const hasFilters = filters.length > 0;

  return (
    <FilterContext.Provider
      value={{ filters, addFilter, removeFilter, clearFilters, hasFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
