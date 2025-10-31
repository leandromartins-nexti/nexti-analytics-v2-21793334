import { createContext, useContext, useState, ReactNode } from "react";

export interface ActiveFilter {
  type: string;
  value: string;
  label: string;
}

interface PlusDashboardContextType {
  activeFilters: ActiveFilter[];
  addFilter: (filter: ActiveFilter) => void;
  removeFilter: (type: string, value: string) => void;
  clearFilters: () => void;
  isFilterActive: (type: string, value: string) => boolean;
}

const PlusDashboardContext = createContext<PlusDashboardContextType | undefined>(undefined);

export function PlusDashboardProvider({ children }: { children: ReactNode }) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const addFilter = (filter: ActiveFilter) => {
    setActiveFilters(prev => {
      const filtered = prev.filter(f => !(f.type === filter.type && f.value === filter.value));
      return [...filtered, filter];
    });
  };

  const removeFilter = (type: string, value: string) => {
    setActiveFilters(prev => prev.filter(f => !(f.type === type && f.value === value)));
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const isFilterActive = (type: string, value: string) => {
    return activeFilters.some(f => f.type === type && f.value === value);
  };

  return (
    <PlusDashboardContext.Provider value={{ activeFilters, addFilter, removeFilter, clearFilters, isFilterActive }}>
      {children}
    </PlusDashboardContext.Provider>
  );
}

export function usePlusDashboard() {
  const context = useContext(PlusDashboardContext);
  if (!context) {
    throw new Error("usePlusDashboard must be used within PlusDashboardProvider");
  }
  return context;
}
