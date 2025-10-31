import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { FilterProvider } from "@/contexts/FilterContext";
import TerminalHaas from "./haas/TerminalHaas";

const HaasTerminal = () => {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-background">
        <DashboardHeader title="Haas - Terminal" />
        <div className="container mx-auto p-6">
          <TerminalHaas />
        </div>
      </div>
    </FilterProvider>
  );
};

export default HaasTerminal;
