import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ScoreConfigProvider } from "./contexts/ScoreConfigContext";
import { AbsenteismoScoreConfigProvider } from "./contexts/AbsenteismoScoreConfigContext";
import { NextiScoreConfigProvider } from "./contexts/NextiScoreConfigContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { InsightsTourProvider } from "./contexts/InsightsTourContext";
import InsightsTourOverlay from "./components/analytics/InsightsTourOverlay";

// Analytics V1 pages
import AnalyticsResumoExecutivo from "./pages/analytics/AnalyticsResumoExecutivo";
import AnalyticsOperacional from "./pages/analytics/AnalyticsOperacional";
import AnalyticsCompliance from "./pages/analytics/AnalyticsCompliance";
import AnalyticsEngajamento from "./pages/analytics/AnalyticsEngajamento";
import AnalyticsConfiguracao from "./pages/analytics/AnalyticsConfiguracao";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <CustomerProvider>
      <ScoreConfigProvider>
        <AbsenteismoScoreConfigProvider>
          <NextiScoreConfigProvider>
          <InsightsTourProvider>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<AnalyticsResumoExecutivo />} />

              {/* Analytics — 2-level menu */}
              <Route path="/analytics" element={<AnalyticsResumoExecutivo />} />
              <Route path="/analytics/operacional" element={<AnalyticsOperacional />} />
              <Route path="/analytics/compliance" element={<AnalyticsCompliance />} />
              <Route path="/analytics/engajamento" element={<AnalyticsEngajamento />} />
              <Route path="/analytics/configuracao" element={<AnalyticsConfiguracao />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <InsightsTourOverlay />
          </InsightsTourProvider>
          </NextiScoreConfigProvider>
        </AbsenteismoScoreConfigProvider>
      </ScoreConfigProvider>
    </CustomerProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginGuard />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

function LoginGuard() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Login />;
}

export default App;
