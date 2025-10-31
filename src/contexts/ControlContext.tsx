import { createContext, useContext, useState, ReactNode } from "react";

interface ControlFilterContextType {
  empresa: string | null;
  cliente: string | null;
  posto: string | null;
  colaborador: string | null;
  setEmpresa: (value: string | null) => void;
  setCliente: (value: string | null) => void;
  setPosto: (value: string | null) => void;
  setColaborador: (value: string | null) => void;
  clearFilters: () => void;
  hasFilters: boolean;
}

const ControlFilterContext = createContext<ControlFilterContextType | undefined>(undefined);

export function ControlFilterProvider({ children }: { children: ReactNode }) {
  const [empresa, setEmpresa] = useState<string | null>(null);
  const [cliente, setCliente] = useState<string | null>(null);
  const [posto, setPosto] = useState<string | null>(null);
  const [colaborador, setColaborador] = useState<string | null>(null);

  const clearFilters = () => {
    setEmpresa(null);
    setCliente(null);
    setPosto(null);
    setColaborador(null);
  };

  const hasFilters = empresa !== null || cliente !== null || posto !== null || colaborador !== null;

  return (
    <ControlFilterContext.Provider
      value={{
        empresa,
        cliente,
        posto,
        colaborador,
        setEmpresa,
        setCliente,
        setPosto,
        setColaborador,
        clearFilters,
        hasFilters,
      }}
    >
      {children}
    </ControlFilterContext.Provider>
  );
}

export function useControlFilter() {
  const context = useContext(ControlFilterContext);
  if (context === undefined) {
    throw new Error("useControlFilter must be used within a ControlFilterProvider");
  }
  return context;
}
