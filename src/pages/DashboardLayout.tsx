import { Outlet } from "react-router-dom";
import { FilterProvider } from "@/contexts/FilterContext";
import { PrimeFilterProvider } from "@/contexts/PrimeFilterContext";
import { AppSidebar } from "@/components/layout/AppSidebar";

const DashboardLayout = () => {
  return (
    <FilterProvider>
      <PrimeFilterProvider>
        <div className="min-h-screen w-full bg-background flex">
          <AppSidebar />
          <main className="flex-1 ml-64 transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </PrimeFilterProvider>
    </FilterProvider>
  );
};

export default DashboardLayout;
