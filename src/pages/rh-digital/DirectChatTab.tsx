import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Clock, Timer, Star } from "lucide-react";
import { rhDigitalData } from "@/lib/rhDigitalData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRhDigital } from "@/contexts/RhDigitalContext";
import { Progress } from "@/components/ui/progress";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function DirectChatTab() {
  const { filters, setFilter, clearFilter } = useRhDigital();
  const { 
    averageAttendanceTime, 
    averageWaitTime, 
    averageRating,
    totalAttendances,
    attendancesByStatus, 
    topSubjects,
    attendancesEvolution,
    waitTimeByOperator,
    waitTimeByAttendant,
    attendanceTimeByAttendant,
    waitTimeBySubject,
    attendanceTimeBySubject,
    attendantRanking
  } = rhDigitalData.directChat;

  const handleStatusClick = (status: string) => {
    if (filters.status === status) {
      clearFilter('status');
    } else {
      setFilter('status', status);
    }
  };

  const handleSubjectClick = (subject: string) => {
    if (filters.assunto === subject) {
      clearFilter('assunto');
    } else {
      setFilter('assunto', subject);
    }
  };

  const handleOperatorClick = (operador: string) => {
    if (filters.operador === operador) {
      clearFilter('operador');
    } else {
      setFilter('operador', operador);
    }
  };

  return (
    <div className="space-y-6">
      {/* Big Numbers */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Tempo Médio de Atendimento (TMA)"
          value={averageAttendanceTime}
          icon={Timer}
        />
        <KPICard
          title="Tempo Médio em Espera (TME)"
          value={averageWaitTime}
          icon={Clock}
        />
        <KPICard
          title="Avaliação Média do Atendimento"
          value={averageRating.toFixed(1)}
          icon={Star}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Atendimentos por Status */}
        <ChartCard title="Total de Atendimentos Segmentados por Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendancesByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percentage }) => `${status}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleStatusClick(data.status)}
                style={{ cursor: 'pointer' }}
              >
                {attendancesByStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    opacity={filters.status && filters.status !== entry.status ? 0.3 : 1}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top 10 Assuntos */}
        <ChartCard title="Total de Atendimentos por Assunto (Top 10)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSubjects} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="subject" type="category" width={150} />
              <Tooltip />
              <Bar 
                dataKey="total" 
                fill="hsl(var(--primary))"
                onClick={(data) => handleSubjectClick(data.subject)}
                style={{ cursor: 'pointer' }}
              >
                {topSubjects.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    opacity={filters.assunto && filters.assunto !== entry.subject ? 0.3 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Evolução Temporal */}
      <ChartCard title="Evolução do Total de Atendimentos e Tempo Médio em Espera">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendancesEvolution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="attendances" stroke="hsl(var(--primary))" strokeWidth={2} name="Atendimentos" />
            <Line yAxisId="right" type="monotone" dataKey="waitTime" stroke="hsl(var(--chart-2))" strokeWidth={2} name="TME (min)" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Tempo Médio de Espera */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tempo Médio de Atendimento por Atendente */}
        <ChartCard title="Tempo Médio de Atendimento por Atendente">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Atendente</TableHead>
                <TableHead className="text-right">TMA</TableHead>
                <TableHead className="text-right">Atendimentos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceTimeByAttendant.map((item, idx) => (
                <TableRow 
                  key={idx}
                  onClick={() => handleOperatorClick(item.operador)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  style={{
                    opacity: filters.operador && filters.operador !== item.operador ? 0.3 : 1
                  }}
                >
                  <TableCell className="font-medium">{item.operador}</TableCell>
                  <TableCell className="text-right">{item.attendanceTime}</TableCell>
                  <TableCell className="text-right">{item.atendimentos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>

        {/* Tempo Médio de Atendimento por Assunto */}
        <ChartCard title="Tempo Médio de Atendimento por Assunto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assunto</TableHead>
                <TableHead className="text-right">TMA</TableHead>
                <TableHead className="text-right">Atendimentos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceTimeBySubject.map((item, idx) => (
                <TableRow 
                  key={idx}
                  onClick={() => handleSubjectClick(item.assunto)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  style={{
                    opacity: filters.assunto && filters.assunto !== item.assunto ? 0.3 : 1
                  }}
                >
                  <TableCell className="font-medium">{item.assunto}</TableCell>
                  <TableCell className="text-right">{item.attendanceTime}</TableCell>
                  <TableCell className="text-right">{item.atendimentos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </div>

      {/* Rankings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ranking de Atendentes */}
        <ChartCard title="Ranking de Atendentes por Total de Atendimentos Finalizados">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendantRanking} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="operador" type="category" width={120} />
              <Tooltip />
              <Bar 
                dataKey="finalizados" 
                fill="hsl(var(--chart-3))"
                onClick={(data) => handleOperatorClick(data.operador)}
                style={{ cursor: 'pointer' }}
              >
                {attendantRanking.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    opacity={filters.operador && filters.operador !== entry.operador ? 0.3 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
