// TODO: REMOVER EM PRODUÇÃO
// Este contexto implementa o seletor de cliente para fase de testes.
// Em produção, o customer_id deve vir do contexto OAuth2/JWT.

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import customersIndex from "@/data/customers-index.json";

export interface CustomerEntry {
  customer_id: number;
  label: string;
  tabs_available: string[];
}

interface CustomerContextType {
  customerId: number;
  customerLabel: string;
  customers: CustomerEntry[];
  setCustomerId: (id: number) => void;
  /** Load JSON data for the current customer. Returns null if not found. */
  loadCustomerData: (tab: string, chart: string, dimension: string) => Promise<any | null>;
}

const STORAGE_KEY = "nexti_active_customer_id";

function getStoredCustomerId(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const id = parseInt(stored, 10);
      if (!isNaN(id) && customersIndex.customers.some(c => c.customer_id === id)) {
        return id;
      }
    }
  } catch {}
  return customersIndex.customers[0]?.customer_id ?? 642;
}

// TODO: REMOVER EM PRODUÇÃO — cor determinística por customer_id
export function getCustomerColor(customerId: number): string {
  const hue = (customerId * 137.508) % 360;
  return `hsl(${Math.round(hue)}, 70%, 50%)`;
}

const CustomerContext = createContext<CustomerContextType>({
  customerId: 642,
  customerLabel: "Cliente 642",
  customers: customersIndex.customers,
  setCustomerId: () => {},
  loadCustomerData: async () => null,
});

export function useCustomer() {
  return useContext(CustomerContext);
}

// Vite glob for dynamic JSON loading from customers folder
const customerJsonModules = import.meta.glob<Record<string, any>>(
  "/src/data/customers/*/qualidade-ponto/*.json",
  { eager: false }
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customerId, setCustomerIdState] = useState<number>(getStoredCustomerId);

  const customerLabel = customersIndex.customers.find(c => c.customer_id === customerId)?.label ?? `Cliente ${customerId}`;

  const setCustomerId = useCallback((id: number) => {
    setCustomerIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, String(id));
    } catch {}
  }, []);

  const loadCustomerData = useCallback(async (tab: string, chart: string, dimension: string): Promise<any | null> => {
    const path = `/src/data/customers/${customerId}/${tab}/${chart}-${dimension}.json`;
    const loader = customerJsonModules[path];
    if (!loader) return null;
    try {
      const mod = await loader();
      return (mod as any).default ?? mod;
    } catch {
      return null;
    }
  }, [customerId]);

  return (
    <CustomerContext.Provider value={{
      customerId,
      customerLabel,
      customers: customersIndex.customers,
      setCustomerId,
      loadCustomerData,
    }}>
      {children}
    </CustomerContext.Provider>
  );
}
