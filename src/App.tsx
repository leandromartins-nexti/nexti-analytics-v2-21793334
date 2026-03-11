import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Prime from "./pages/Prime";
import Haas from "./pages/Haas";
import HaasSmart from "./pages/HaasSmart";
import HaasTerminal from "./pages/HaasTerminal";
import RhDigital from "./pages/RhDigital";
import Plus from "./pages/Plus";
import Time from "./pages/Time";
import Control from "./pages/Control";
import ManagementOverview from "./pages/management/Overview";
import ManagementInconsistencies from "./pages/management/Inconsistencies";
import ManagementTimeBank from "./pages/management/TimeBank";
import ManagementCompliance from "./pages/management/Compliance";
import TimeV2 from "./pages/management/TimeV2";
import TimeV2Operational from "./pages/management/TimeV2Operational";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<NotFound />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
