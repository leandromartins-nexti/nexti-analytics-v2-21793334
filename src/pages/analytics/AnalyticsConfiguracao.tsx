import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function AnalyticsConfiguracao() {
  const navigate = useNavigate();

  return (
    <div className="bg-[hsl(var(--surface))] min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-3 bg-[hsl(var(--surface))]">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#FF5722] font-medium cursor-pointer hover:underline" onClick={() => navigate("/analytics")}>Home</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[#FF5722] font-medium cursor-pointer hover:underline" onClick={() => navigate("/analytics")}>Analytics</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground font-semibold">Configuração</span>
        </div>
      </header>

      <div className="px-6 py-6 flex-1">
        <p className="text-muted-foreground">Configuração — em construção.</p>
      </div>
    </div>
  );
}
