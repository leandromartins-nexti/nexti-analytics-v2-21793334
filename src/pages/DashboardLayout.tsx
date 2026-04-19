import { Outlet, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { FilterProvider } from "@/contexts/FilterContext";
import { FloatingActionMenu } from "@/components/layout/FloatingActionMenu";
import OnboardingTour from "@/components/onboarding/OnboardingTour";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User } from "lucide-react";

const MobileMenuButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" onClick={toggleSidebar} aria-label="Abrir menu">
      <Menu className="h-5 w-5" />
    </Button>
  );
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <FilterProvider>
      <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center justify-between border-b border-border bg-card px-4">
                <div className="flex items-center gap-3">
                  <MobileMenuButton />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {user?.name}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8 text-xs gap-1.5">
                    <LogOut className="h-3.5 w-3.5" />
                    Sair
                  </Button>
                </div>
              </header>
              <main className="flex-1 flex flex-col">
                <Outlet />
              </main>
            </div>
          </div>
          <FloatingActionMenu />
          <OnboardingTour />
        </SidebarProvider>
    </FilterProvider>
  );
};

export default DashboardLayout;
