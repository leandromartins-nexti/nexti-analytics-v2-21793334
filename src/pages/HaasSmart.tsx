import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { FilterProvider } from "@/contexts/FilterContext";
import SmartHaas from "./haas/SmartHaas";

const HaasSmart = () => {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-background">
        <DashboardHeader title="Haas - Smart" />
        <div className="container mx-auto p-6">
          <SmartHaas />
        </div>
      </div>
    </FilterProvider>
  );
};

export default HaasSmart;
