import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Users, UserCheck, UserX, AlertTriangle, Umbrella, Calendar, Shield } from "lucide-react";
import { operationalOverview, colaboradoresPorSituacao, coberturaPorHora, coberturaDiariaMensal } from "@/lib/managementData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CoberturaPorHoraTable } from "@/components/management/CoberturaPorHoraTable";
import { CalendarioCobertura } from "@/components/management/CalendarioCobertura";
import { CoberturaVsNecessidade } from "@/components/management/CoberturaVsNecessidade";

const ManagementOverview = () => {
  return (
    <div className="flex-1 overflow-auto bg-background">
      <DashboardHeader 
        title="Visão Geral Operacional" 
        breadcrumbs={["Management Analytics", "Visão Geral"]}
      />

      <main className="p-8 space-y-6">
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Vagas"
            value={operationalOverview.qtdVagas.toLocaleString()}
            icon={Calendar}
          />
          <KPICard
            title="Colaboradores Ativos"
            value={operationalOverview.qtdColaboradoresEfetivos.toLocaleString()}
            icon={Users}
          />
          <KPICard
            title="Presentes"
            value={operationalOverview.qtdPresentes.toLocaleString()}
            icon={UserCheck}
          />
          <KPICard
            title="Possíveis Faltantes"
            value={operationalOverview.qtdPossiveisFaltantes.toLocaleString()}
            icon={AlertTriangle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="Ausentes"
            value={operationalOverview.qtdAusentes.toLocaleString()}
            icon={UserX}
          />
          <KPICard
            title="Em Férias"
            value={operationalOverview.qtdFerias.toLocaleString()}
            icon={Umbrella}
          />
          <KPICard
            title="Cobertura do Dia"
            value={`${operationalOverview.coberturaDiaPercentual.toFixed(2)}%`}
            icon={Shield}
          />
        </div>

        {/* Colaboradores por Situação - Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Colaboradores por Situação">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={colaboradoresPorSituacao}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={150}
                    paddingAngle={2}
                    dataKey="quantidade"
                    nameKey="situacao"
                    label={({ situacao, quantidade }) => `${situacao}: ${quantidade}`}
                  >
                    {colaboradoresPorSituacao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend formatter={(value) => value} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Cobertura por Hora */}
          <CoberturaPorHoraTable data={coberturaPorHora} />
        </div>

        {/* Cobertura vs Necessidade */}
        <CoberturaVsNecessidade />

        {/* Calendário de Cobertura */}
        <CalendarioCobertura data={coberturaDiariaMensal} />
      </main>
    </div>
  );
};

export default ManagementOverview;
