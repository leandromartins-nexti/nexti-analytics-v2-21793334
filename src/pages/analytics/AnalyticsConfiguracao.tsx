import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function AnalyticsConfiguracao() {
  const navigate = useNavigate();

  return (
    <div className="bg-[hsl(var(--surface))] min-h-screen flex flex-col">
      <div className="px-6 py-6 flex-1">
        <p className="text-muted-foreground">Configuração — em construção.</p>
      </div>
    </div>
  );
}
