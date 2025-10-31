import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActiveFilterBadge } from "@/components/dashboard/ActiveFilterBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CheckSquare, CheckCircle2, AlertTriangle } from "lucide-react";
import { rhDigitalData } from "@/lib/rhDigitalData";
import { getFilteredChecklistMetrics } from "@/lib/rhDigitalDataHelpers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRhDigital } from "@/contexts/RhDigitalContext";
import { useMemo } from "react";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export default function ChecklistTab() {
  const { filters, setFilter, clearFilter } = useRhDigital();
  const { 
    responseStatus,
    deviceDistribution,
    postsNotRespondedRanking,
    employeesNotRespondedRanking
  } = rhDigitalData.checklist;

  // Calculate filtered metrics based on active colaborador filter
  const filteredMetrics = useMemo(() => 
    getFilteredChecklistMetrics(filters.colaborador),
    [filters.colaborador]
  );

  const {
    totalSent,
    totalResponded,
    totalNotResponded,
  } = filteredMetrics;

  const handlePostoClick = (posto: string) => {
    if (filters.posto === posto) {
      clearFilter('posto');
    } else {
      setFilter('posto', posto);
    }
  };

  const handleColaboradorClick = (colaborador: string) => {
    if (filters.colaborador === colaborador) {
      clearFilter('colaborador');
    } else {
      setFilter('colaborador', colaborador);
    }
  };

  const handleDeviceClick = (device: string) => {
    if (filters.meioEnvio === device) {
      clearFilter('meioEnvio');
    } else {
      setFilter('meioEnvio', device);
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Filter Badge */}
      {filters.colaborador && (
        <ActiveFilterBadge
          filterType="Colaborador"
          filterValue={filters.colaborador}
          onClear={() => clearFilter('colaborador')}
        />
      )}

      {/* Big Numbers */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Quantidade Total de Checklists Enviados"
          value={totalSent.toLocaleString()}
          icon={CheckSquare}
        />
        <KPICard
          title="Quantidade de Checklists Respondidos"
          value={totalResponded.toLocaleString()}
          icon={CheckCircle2}
        />
        <KPICard
          title="Quantidade de Checklists Não Respondidos"
          value={totalNotResponded.toLocaleString()}
          icon={AlertTriangle}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status de Resposta */}
        <ChartCard title="% de Checklists Respondidos vs. Não Respondidos">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={responseStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percentage }) => `${status}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {responseStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Distribuição por Dispositivo */}
        <ChartCard title="Distribuição do Dispositivo de Resposta/Visualização">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ device, value }) => `${device}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleDeviceClick(data.device)}
                style={{ cursor: 'pointer' }}
              >
                {deviceDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    opacity={filters.meioEnvio && filters.meioEnvio !== entry.device ? 0.3 : 1}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Rankings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ranking de Postos */}
        <ChartCard title="Top 10 Postos - Maior Taxa de Checklists Não Respondidos">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Pos.</TableHead>
                <TableHead>Posto</TableHead>
                <TableHead className="text-right">Enviados</TableHead>
                <TableHead className="text-right">Não Respondidos</TableHead>
                <TableHead className="text-right">Taxa (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {postsNotRespondedRanking.map((item) => (
                <TableRow 
                  key={item.position}
                  onClick={() => handlePostoClick(item.posto)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  style={{
                    opacity: filters.posto && filters.posto !== item.posto ? 0.3 : 1
                  }}
                >
                  <TableCell className="font-medium">{item.position}º</TableCell>
                  <TableCell>{item.posto}</TableCell>
                  <TableCell className="text-right">{item.sent}</TableCell>
                  <TableCell className="text-right">{item.notResponded}</TableCell>
                  <TableCell className="text-right font-semibold">{item.rate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>

        {/* Ranking de Colaboradores */}
        <ChartCard title="Top 10 Colaboradores - Maior Taxa de Checklists Não Respondidos">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Pos.</TableHead>
                <TableHead>Colaborador</TableHead>
                <TableHead className="text-right">Enviados</TableHead>
                <TableHead className="text-right">Não Respondidos</TableHead>
                <TableHead className="text-right">Taxa (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeesNotRespondedRanking.map((item) => (
                <TableRow 
                  key={item.position}
                  onClick={() => handleColaboradorClick(item.employee)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  style={{
                    opacity: filters.colaborador && filters.colaborador !== item.employee ? 0.3 : 1
                  }}
                >
                  <TableCell className="font-medium">{item.position}º</TableCell>
                  <TableCell>{item.employee}</TableCell>
                  <TableCell className="text-right">{item.sent}</TableCell>
                  <TableCell className="text-right">{item.notResponded}</TableCell>
                  <TableCell className="text-right font-semibold">{item.rate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </div>
    </div>
  );
}
