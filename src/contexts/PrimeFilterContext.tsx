import { createContext, useContext, useState, ReactNode } from "react";

interface PrimeFilterContextType {
  selectedEmpresa: string | null;
  selectedCliente: string | null;
  selectedPosto: string | null;
  selectedColaborador: string | null;
  selectedTipoInconsistencia: string | null;
  setSelectedEmpresa: (empresa: string | null) => void;
  setSelectedCliente: (cliente: string | null) => void;
  setSelectedPosto: (posto: string | null) => void;
  setSelectedColaborador: (colaborador: string | null) => void;
  setSelectedTipoInconsistencia: (tipo: string | null) => void;
  clearFilters: () => void;
}

const PrimeFilterContext = createContext<PrimeFilterContextType | undefined>(undefined);

export function PrimeFilterProvider({ children }: { children: ReactNode }) {
  const [selectedEmpresa, setSelectedEmpresa] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null);
  const [selectedPosto, setSelectedPosto] = useState<string | null>(null);
  const [selectedColaborador, setSelectedColaborador] = useState<string | null>(null);
  const [selectedTipoInconsistencia, setSelectedTipoInconsistencia] = useState<string | null>(null);

  const clearFilters = () => {
    setSelectedEmpresa(null);
    setSelectedCliente(null);
    setSelectedPosto(null);
    setSelectedColaborador(null);
    setSelectedTipoInconsistencia(null);
  };

  return (
    <PrimeFilterContext.Provider
      value={{
        selectedEmpresa,
        selectedCliente,
        selectedPosto,
        selectedColaborador,
        selectedTipoInconsistencia,
        setSelectedEmpresa,
        setSelectedCliente,
        setSelectedPosto,
        setSelectedColaborador,
        setSelectedTipoInconsistencia,
        clearFilters,
      }}
    >
      {children}
    </PrimeFilterContext.Provider>
  );
}

export function usePrimeFilters() {
  const context = useContext(PrimeFilterContext);
  if (context === undefined) {
    throw new Error("usePrimeFilters must be used within a PrimeFilterProvider");
  }
  return context;
}
