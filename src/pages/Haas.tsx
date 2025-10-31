import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { FilterProvider } from "@/contexts/FilterContext";
import GeneralHaas from "./haas/GeneralHaas";
const Haas = () => {
  return <FilterProvider>
      <div className="min-h-screen bg-background">
        
        <div className="container mx-auto p-6">
          <GeneralHaas />
        </div>
      </div>
    </FilterProvider>;
};
export default Haas;