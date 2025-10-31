import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActiveFilterBadge } from "@/components/dashboard/ActiveFilterBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Bell, CheckCircle, AlertCircle, Eye, Send, FileCheck } from "lucide-react";
import { rhDigitalData } from "@/lib/rhDigitalData";
import { getFilteredAvisosConvocacoesMetrics } from "@/lib/rhDigitalDataHelpers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRhDigital } from "@/contexts/RhDigitalContext";
import { useMemo, useState } from "react";
import { EngajamentoClienteDetailModal } from "@/components/rh-digital/EngajamentoClienteDetailModal";
import { EngajamentoPostoDetailModal } from "@/components/rh-digital/EngajamentoPostoDetailModal";
import { EngajamentoColaboradorDetailModal } from "@/components/rh-digital/EngajamentoColaboradorDetailModal";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function AvisosConvocacoesTab() {
  const { filters, setFilter, clearFilter } = useRhDigital();
  const { 
    signatureByChannel,
    convocacoesEvolution,
    avisosEvolution,
    deviceDistribution,
    signatureDeviceDistribution,
    visualizationDeviceDistribution,
    postsIgnoredRanking,
    employeesIgnoredRanking,
    engajamentoGeralDetalhado
  } = rhDigitalData.avisosConvocacoes;

  // Engajamento modals state
  const [engajamentoClienteModalOpen, setEngajamentoClienteModalOpen] = useState(false);
  const [engajamentoPostoModalOpen, setEngajamentoPostoModalOpen] = useState(false);
  const [engajamentoColaboradorModalOpen, setEngajamentoColaboradorModalOpen] = useState(false);
  const [engajamentoSelectedEmpresa, setEngajamentoSelectedEmpresa] = useState("");
  const [engajamentoSelectedCliente, setEngajamentoSelectedCliente] = useState("");
  const [engajamentoSelectedPosto, setEngajamentoSelectedPosto] = useState("");
  const [engajamentoClientes, setEngajamentoClientes] = useState<any[]>([]);
  const [engajamentoPostos, setEngajamentoPostos] = useState<any[]>([]);
  const [engajamentoColaboradores, setEngajamentoColaboradores] = useState<any[]>([]);

  // Calculate filtered metrics based on active colaborador filter
  const filteredMetrics = useMemo(() => 
    getFilteredAvisosConvocacoesMetrics(filters.colaborador),
    [filters.colaborador]
  );

  const {
    totalAvisosEnviados,
    totalAvisosVisualizados,
    totalConvocacoesEnviadas,
    totalConvocacoesRespondidas,
    totalConvocacoesNaoRespondidas,
    totalConvocacoesVisualizadasNaoRespondidas,
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

  // Engajamento handlers
  const handleEngajamentoEmpresaClick = (empresa: string) => {
    const empresaData = engajamentoGeralDetalhado.find(e => e.empresa === empresa);
    if (empresaData?.clientes) {
      setEngajamentoSelectedEmpresa(empresa);
      setEngajamentoClientes(empresaData.clientes);
      setEngajamentoClienteModalOpen(true);
    }
  };

  const handleEngajamentoClienteClick = (cliente: string) => {
    const clienteData = engajamentoClientes.find(c => c.cliente === cliente);
    if (clienteData?.postos) {
      setEngajamentoSelectedCliente(cliente);
      setEngajamentoPostos(clienteData.postos);
      setEngajamentoClienteModalOpen(false);
      setEngajamentoPostoModalOpen(true);
    }
  };

  const handleEngajamentoPostoClick = (posto: string) => {
    const postoData = engajamentoPostos.find(p => p.posto === posto);
    if (postoData?.colaboradores) {
      setEngajamentoSelectedPosto(posto);
      setEngajamentoColaboradores(postoData.colaboradores);
      setEngajamentoPostoModalOpen(false);
      setEngajamentoColaboradorModalOpen(true);
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
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <KPICard
          title="Total de Avisos Enviados"
          value={totalAvisosEnviados.toLocaleString()}
          icon={Send}
        />
        <KPICard
          title="Total de Avisos Visualizados"
          value={totalAvisosVisualizados.toLocaleString()}
          icon={Eye}
        />
        <KPICard
          title="Total de Convocações Enviadas"
          value={totalConvocacoesEnviadas.toLocaleString()}
          icon={Bell}
        />
        <KPICard
          title="Total de Convocações Respondidas"
          value={totalConvocacoesRespondidas.toLocaleString()}
          icon={CheckCircle}
        />
        <KPICard
          title="Total de Convocações Não Respondidas"
          value={totalConvocacoesNaoRespondidas.toLocaleString()}
          icon={AlertCircle}
        />
        <KPICard
          title="Total de Convocações Visualizadas, mas Não Respondidas"
          value={totalConvocacoesVisualizadasNaoRespondidas.toLocaleString()}
          icon={FileCheck}
        />
      </div>


      {/* Distribuição por Dispositivo */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Distribuição do Dispositivo de Convocação */}
        <ChartCard title="Distribuição de Uso do Dispositivo de Convocação">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={signatureDeviceDistribution}
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
                {signatureDeviceDistribution.map((entry, index) => (
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

        {/* Distribuição do Dispositivo de Aviso */}
        <ChartCard title="Distribuição de Uso do Dispositivo de Aviso">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visualizationDeviceDistribution}
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
                {visualizationDeviceDistribution.map((entry, index) => (
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

      {/* Evolução de Status - Convocações e Avisos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Evolução do Status de Convocações */}
        <ChartCard title="Evolução do Status de Convocações">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={convocacoesEvolution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="enviado" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Enviado" />
              <Line type="monotone" dataKey="naoRespondido" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Não Respondido" />
              <Line type="monotone" dataKey="visualizadoNaoRespondido" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Visualizado, mas Não Respondido" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Evolução do Status de Avisos */}
        <ChartCard title="Evolução do Status de Avisos">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={avisosEvolution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="enviado" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Enviado" />
              <Line type="monotone" dataKey="visualizado" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Visualizado" />
              <Line type="monotone" dataKey="naoVisualizado" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Não Visualizado" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Engajamento Geral do Módulo */}
      <ChartCard title="Engajamento Geral do Módulo">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead className="text-right">Engajamento Avisos</TableHead>
              <TableHead className="text-right">Engajamento Convocações</TableHead>
              <TableHead className="text-right">Engajamento Geral</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {engajamentoGeralDetalhado.map((item) => (
              <TableRow
                key={item.empresa}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleEngajamentoEmpresaClick(item.empresa)}
              >
                <TableCell className="font-medium">{item.empresa}</TableCell>
                <TableCell className="text-right font-semibold text-blue-600">
                  {item.engajamentoAvisos.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-semibold text-purple-600">
                  {item.engajamentoConvocacoes.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  {item.engajamentoGeral.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>

      {/* Engajamento Modals */}
      <EngajamentoClienteDetailModal
        isOpen={engajamentoClienteModalOpen}
        onClose={() => setEngajamentoClienteModalOpen(false)}
        empresa={engajamentoSelectedEmpresa}
        clientes={engajamentoClientes}
        onClienteClick={handleEngajamentoClienteClick}
      />
      <EngajamentoPostoDetailModal
        isOpen={engajamentoPostoModalOpen}
        onClose={() => setEngajamentoPostoModalOpen(false)}
        cliente={engajamentoSelectedCliente}
        postos={engajamentoPostos}
        onPostoClick={handleEngajamentoPostoClick}
      />
      <EngajamentoColaboradorDetailModal
        isOpen={engajamentoColaboradorModalOpen}
        onClose={() => setEngajamentoColaboradorModalOpen(false)}
        posto={engajamentoSelectedPosto}
        colaboradores={engajamentoColaboradores}
      />
    </div>
  );
}
