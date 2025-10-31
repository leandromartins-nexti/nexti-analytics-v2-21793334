import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActiveFilterBadge } from "@/components/dashboard/ActiveFilterBadge";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useFilters } from "@/contexts/FilterContext";
import { getFilteredTimeTrackingMetrics } from "@/lib/rhDigitalDataHelpers";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  inconsistencyRanking,
  inconsistencyTypesByMonth,
  inconsistencyByBusinessUnit,
  markingQuality,
  adjustmentReasons,
  inconsistencyReasons,
} from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TimeTracking = () => {
  const { filters, addFilter, removeFilter } = useFilters();
  
  // Get active colaborador filter
  const activeColaboradorFilter = filters.find(f => f.category === 'employee');
  
  // Calculate filtered metrics
  const filteredMetrics = useMemo(() => 
    getFilteredTimeTrackingMetrics(activeColaboradorFilter?.value),
    [activeColaboradorFilter]
  );

  const { totalInconsistencies, totalAdjustmentRequests, processedRequests, markingQuality: markingQualityPercent } = filteredMetrics;

  // Filter data based on active filters
  const filteredRanking = useMemo(() => {
    if (filters.length === 0) return inconsistencyRanking;
    
    return inconsistencyRanking.filter((item) => {
      return filters.every((filter) => {
        if (filter.category === 'employee') return item.name === filter.value;
        if (filter.category === 'role') return item.role === filter.value;
        if (filter.category === 'company') return item.company === filter.value;
        if (filter.category === 'unit') return item.unit === filter.value;
        return true;
      });
    });
  }, [filters]);

  const filteredTypesByMonth = useMemo(() => {
    // For this example, we're not filtering the monthly data, but you could implement it
    return inconsistencyTypesByMonth;
  }, [filters]);

  const filteredByBusinessUnit = useMemo(() => {
    // For this example, we're not filtering the monthly data, but you could implement it
    return inconsistencyByBusinessUnit;
  }, [filters]);

  const handleBarClick = (data: any, monthCategory: string, segmentCategory: string, segmentLabel: string) => {
    if (data && data.activeLabel) {
      // Add month filter
      addFilter({
        category: monthCategory,
        value: data.activeLabel,
        label: `Mês: ${data.activeLabel}`,
      });
      
      // Add segment filter if a specific bar segment was clicked
      if (data.activePayload && data.activePayload.length > 0) {
        const clickedSegment = data.activePayload[0].dataKey;
        addFilter({
          category: segmentCategory,
          value: clickedSegment as string,
          label: `${segmentLabel}: ${clickedSegment}`,
        });
      }
    }
  };

  const handleTableCellClick = (category: string, value: string, label: string) => {
    addFilter({
      category,
      value,
      label: `${label}: ${value}`,
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <DashboardHeader 
        title="Unidade de Negócio" 
        breadcrumbs={["Registro de ponto", "Cliente"]}
      />

      <main className="p-8 space-y-6">
        {/* Active Filter Badge */}
        {activeColaboradorFilter && (
          <ActiveFilterBadge
            filterType="Colaborador"
            filterValue={activeColaboradorFilter.value}
            onClear={() => removeFilter(activeColaboradorFilter)}
          />
        )}
        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Qualidade da Marcação"
            value={`${markingQualityPercent}%`}
            icon={CheckCircle2}
          />
          <KPICard
            title="Total de inconsistências"
            value={totalInconsistencies.toLocaleString()}
            icon={AlertTriangle}
          />
          <KPICard
            title="Total de solicitações de ajuste"
            value={totalAdjustmentRequests.toLocaleString()}
            icon={Clock}
          />
          <KPICard
            title="Total de solicitações de ajuste tratadas"
            value={processedRequests.toLocaleString()}
            icon={CheckCircle2}
          />
        </div>

        {/* Inconsistencies Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Ranking de Inconsistências</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Top 10 Colaboradores com Mais Inconsistências">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Posto</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Un. de Negócio</TableHead>
                    <TableHead className="text-right">Inconsistências</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRanking.map((item) => (
                    <TableRow key={item.rank}>
                      <TableCell className="font-bold">{item.rank}</TableCell>
                      <TableCell 
                        className="font-medium cursor-pointer hover:text-primary hover:underline transition-colors"
                        onClick={() => handleTableCellClick('employee', item.name, 'Colaborador')}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell 
                        className="cursor-pointer hover:text-primary hover:underline transition-colors"
                        onClick={() => handleTableCellClick('role', item.role, 'Posto')}
                      >
                        {item.role}
                      </TableCell>
                      <TableCell 
                        className="cursor-pointer hover:text-primary hover:underline transition-colors"
                        onClick={() => handleTableCellClick('company', item.company, 'Empresa')}
                      >
                        {item.company}
                      </TableCell>
                      <TableCell 
                        className="cursor-pointer hover:text-primary hover:underline transition-colors"
                        onClick={() => handleTableCellClick('unit', item.unit, 'Unidade')}
                      >
                        {item.unit}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {item.inconsistencies.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ChartCard>

            <ChartCard title="Evolução Mensal de Inconsistências por Tipo">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={filteredTypesByMonth}
                    onClick={(data) => handleBarClick(data, 'mês', 'inconsistency_type', 'Tipo')}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend 
                      onClick={(e) => {
                        if (e.dataKey) {
                          addFilter({
                            category: 'inconsistency_type',
                            value: e.dataKey as string,
                            label: `Tipo: ${e.dataKey}`,
                          });
                        }
                      }}
                      wrapperStyle={{ cursor: 'pointer' }}
                    />
                    <Bar dataKey="Horário Inválido" stackId="a" fill="hsl(var(--chart-1))" cursor="pointer" />
                    <Bar dataKey="Não Registrado" stackId="a" fill="hsl(var(--chart-2))" cursor="pointer" />
                    <Bar dataKey="Terminal Não Autorizado" stackId="a" fill="hsl(var(--chart-3))" cursor="pointer" />
                    <Bar dataKey="Fora do Perímetro" stackId="a" fill="hsl(var(--chart-4))" cursor="pointer" />
                    <Bar dataKey="Marcação Duplicada" stackId="a" fill="hsl(var(--chart-5))" cursor="pointer" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          <ChartCard title="Evolução Mensal de Inconsistências por Unidade de Negócio">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={filteredByBusinessUnit}
                  onClick={(data) => handleBarClick(data, 'mês', 'business_unit', 'Un. Negócio')}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend 
                    onClick={(e) => {
                      if (e.dataKey) {
                        addFilter({
                          category: 'business_unit',
                          value: e.dataKey as string,
                          label: `Un. Negócio: ${e.dataKey}`,
                        });
                      }
                    }}
                    wrapperStyle={{ cursor: 'pointer' }}
                  />
                  <Bar dataKey="Orsegups" stackId="a" fill="hsl(var(--chart-1))" cursor="pointer" />
                  <Bar dataKey="Nexti" stackId="a" fill="hsl(var(--chart-2))" cursor="pointer" />
                  <Bar dataKey="Orbenk" stackId="a" fill="hsl(var(--chart-3))" cursor="pointer" />
                  <Bar dataKey="Verzani" stackId="a" fill="hsl(var(--chart-4))" cursor="pointer" />
                  <Bar dataKey="G4S" stackId="a" fill="hsl(var(--chart-5))" cursor="pointer" />
                  <Bar dataKey="JCC" stackId="a" fill="hsl(var(--chart-6))" cursor="pointer" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Marking Quality Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Qualidade da Marcação</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Distribuição de Qualidade">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={markingQuality}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      onClick={(entry) => {
                        addFilter({
                          category: 'quality',
                          value: entry.name,
                          label: `Qualidade: ${entry.name}`,
                        });
                      }}
                      cursor="pointer"
                    >
                      {markingQuality.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Indicadores de Qualidade">
              <div className="space-y-6 pt-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-success" />
                      <span className="font-medium">Marcações Corretas</span>
                    </div>
                    <span className="text-2xl font-bold text-success">85%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-destructive" />
                      <span className="font-medium">Com Inconsistência</span>
                    </div>
                    <span className="text-2xl font-bold text-destructive">15%</span>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Tempo Médio de Tratativa</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Solicitações:</span>
                      <span className="font-semibold">4:53 H</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Inconsistências:</span>
                      <span className="font-semibold">8:53 H</span>
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Principais Motivos de Solicitação de Ajuste">
              <div className="space-y-2">
                {adjustmentReasons.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 rounded-full bg-chart-1" />
                      <span className="text-sm font-medium">{item.reason}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold">{item.count}</span>
                      <span className="text-sm text-muted-foreground w-12 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard title="Principais Motivos de Inconsistências Detectadas">
              <div className="space-y-2">
                {inconsistencyReasons.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span className="text-sm font-medium">{item.reason}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold">{item.count}</span>
                      <span className="text-sm text-muted-foreground w-12 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>

      </main>
    </div>
  );
};

export default TimeTracking;
