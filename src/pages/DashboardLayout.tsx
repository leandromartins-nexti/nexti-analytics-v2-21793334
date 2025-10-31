import { Outlet } from "react-router-dom";
import { FilterProvider } from "@/contexts/FilterContext";
import { PrimeFilterProvider } from "@/contexts/PrimeFilterContext";
import { AppNavigation } from "@/components/layout/AppNavigation";

const DashboardLayout = () => {
  return (
    <FilterProvider>
      <PrimeFilterProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppNavigation />
          <main className="flex-1 ml-64">
            <Outlet />
          </main>
        </div>
      </PrimeFilterProvider>
    </FilterProvider>
  );
};

export default DashboardLayout;
