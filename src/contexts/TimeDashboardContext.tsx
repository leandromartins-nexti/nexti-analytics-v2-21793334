import { createContext, useContext, useState, ReactNode } from "react";

export interface ActiveFilter {
  type: string;
  value: string;
  label: string;
}

interface TimeDashboardContextType {
  activeFilters: ActiveFilter[];
  addFilter: (filter: ActiveFilter) => void;
  removeFilter: (type: string, value: string) => void;
  clearFilters: () => void;
  isFilterActive: (type: string, value: string) => boolean;
}

const TimeDashboardContext = createContext<TimeDashboardContextType | undefined>(undefined);

export function TimeDashboardProvider({ children }: { children: ReactNode }) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const addFilter = (filter: ActiveFilter) => {
    setActiveFilters(prev => {
      // Remove existing filter of same type and value to avoid duplicates
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
    <TimeDashboardContext.Provider value={{ activeFilters, addFilter, removeFilter, clearFilters, isFilterActive }}>
      {children}
    </TimeDashboardContext.Provider>
  );
}

export function useTimeDashboard() {
  const context = useContext(TimeDashboardContext);
  if (!context) {
    throw new Error("useTimeDashboard must be used within TimeDashboardProvider");
  }
  return context;
}
