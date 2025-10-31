import { createContext, useContext, useState, ReactNode } from "react";

interface RhDigitalFilters {
  period?: { start: Date; end: Date };
  posto?: string;
  colaborador?: string;
  assunto?: string;
  operador?: string;
  grupoAtendimento?: string;
  tipoDocumento?: string;
  meioEnvio?: string;
  tipoAtividade?: string;
  status?: string;
}

interface RhDigitalContextType {
  filters: RhDigitalFilters;
  setFilter: (key: keyof RhDigitalFilters, value: any) => void;
  clearFilter: (key: keyof RhDigitalFilters) => void;
  clearAllFilters: () => void;
}

const RhDigitalContext = createContext<RhDigitalContextType | undefined>(undefined);

export function RhDigitalProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<RhDigitalFilters>({});

  const setFilter = (key: keyof RhDigitalFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof RhDigitalFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <RhDigitalContext.Provider value={{ filters, setFilter, clearFilter, clearAllFilters }}>
      {children}
    </RhDigitalContext.Provider>
  );
}

export function useRhDigital() {
  const context = useContext(RhDigitalContext);
  if (!context) {
    throw new Error("useRhDigital must be used within RhDigitalProvider");
  }
  return context;
}
