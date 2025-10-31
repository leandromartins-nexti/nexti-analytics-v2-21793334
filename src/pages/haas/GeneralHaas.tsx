import { useState, useMemo } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeviceMap } from "@/components/maps/DeviceMap";
import { DeviceDistributionModal } from "@/components/haas/DeviceDistributionModal";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useFilters } from "@/contexts/FilterContext";
import {
  deviceStatus,
  deviceTypeDistribution,
  devicesByCompanyTable,
  clientsByCompany,
  postsByClient,
  deviceLocations,
  disconnectionProblems,
  idleTerminals,
  displacedTerminals,
  devicesInMaintenance,
  maintenanceEvolution,
  topDefects,
  terminalsWithoutPostLink,
  smartVersions,
  terminalVersions,
  terminalModels,
  DeviceLocation,
} from "@/lib/haasData";

const GeneralHaas = () => {
  const { filters, addFilter, removeFilter, clearFilters, hasFilters } = useFilters();
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null);

  // Filter devices based on active filters
  const filteredDevices = useMemo(() => {
    if (!hasFilters) return deviceLocations;
    
    return deviceLocations.filter((device: DeviceLocation) => {
      return filters.every((filter) => {
        switch (filter.category) {
          case "status":
            return device.status === filter.value;
          case "type":
            return device.type === filter.value;
          case "empresa":
            return device.empresa === filter.value;
          case "cliente":
            return device.cliente === filter.value;
          case "softwareVersion":
            return device.version === filter.value;
          case "hardwareModel":
            return device.model === filter.value;
          default:
            return true;
        }
      });
    });
  }, [filters, hasFilters]);

  const totalDevices = filteredDevices.length;
  const totalOnline = filteredDevices.filter(d => d.status === 'online').length;
  const totalOffline = filteredDevices.filter(d => d.status === 'offline').length;
  const totalMaintenance = filteredDevices.filter(d => d.status === 'maintenance').length;
  const totalUnlinked = 15; // This would need proper calculation based on your data structure

  const handleEmpresaClick = (empresa: string) => {
    setSelectedEmpresa(empresa);
    setClientModalOpen(true);
  };

  const handleClienteClick = (cliente: string) => {
    setSelectedCliente(cliente);
    setClientModalOpen(false);
    setPostModalOpen(true);
  };

  const handleChartClick = (category: string, value: string, label: string) => {
    addFilter({ category, value, label });
  };

  const handleCloseClientModal = () => {
    setClientModalOpen(false);
    setSelectedEmpresa(null);
  };

  const handleClosePostModal = () => {
    setPostModalOpen(false);
    setSelectedCliente(null);
  };

  return (
    <div className="space-y-6">
      {hasFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Filtros ativos:</span>
          {filters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {filter.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Limpar todos
          </button>
        </div>
      )}

      {/* Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard title="Total de Dispositivos" value={totalDevices} />
        <KPICard title="Total Online" value={totalOnline} />
        <KPICard title="Total Offline" value={totalOffline} />
        <KPICard title="Dispositivos sem Vínculo com Postos" value={totalUnlinked} />
        <KPICard title="Total em Manutenção" value={totalMaintenance} />
      </div>

      {/* Status and Device Distribution KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Status do Dispositivo">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleChartClick("status", data.name.toLowerCase(), data.name)}
                className="cursor-pointer"
              >
                {deviceStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribuição Smart e TBIs">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleChartClick("type", data.name, data.name)}
                className="cursor-pointer"
              >
                {deviceTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Map */}
      <ChartCard title="Rastreabilidade dos Dispositivos">
        <DeviceMap devices={filteredDevices} />
      </ChartCard>

      {/* Software and Hardware Versions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Versões de Software - TBI">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={terminalVersions}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleChartClick("softwareVersion", data.name, `TBI ${data.name}`)}
                className="cursor-pointer"
              >
                {terminalVersions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Versões de Software - Smart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={smartVersions}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleChartClick("softwareVersion", data.name, `Smart ${data.name}`)}
                className="cursor-pointer"
              >
                {smartVersions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Versões de Hardware - TBI">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={terminalModels}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => handleChartClick("hardwareModel", data.name, `Hardware ${data.name}`)}
                className="cursor-pointer"
              >
                {terminalModels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Device Distribution by Company - Table */}
      <ChartCard title="Rateio dos Dispositivos por Empresa">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Tablets</TableHead>
                <TableHead>TBIs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devicesByCompanyTable.map((row, index) => (
                <TableRow 
                  key={index}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('.filter-btn')) return;
                    handleEmpresaClick(row.empresa);
                  }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {row.empresa}
                      <button
                        className="filter-btn text-xs text-primary hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChartClick("empresa", row.empresa, row.empresa);
                        }}
                      >
                        Filtrar
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>{row.cnpj}</TableCell>
                  <TableCell>{row.tablets}</TableCell>
                  <TableCell>{row.tbis}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ChartCard>

      {/* Client Modal */}
      {selectedEmpresa && (
        <DeviceDistributionModal
          isOpen={clientModalOpen}
          onClose={handleCloseClientModal}
          title={`Clientes - ${selectedEmpresa}`}
          data={clientsByCompany[selectedEmpresa] || []}
          type="client"
          onRowClick={handleClienteClick}
        />
      )}

      {/* Post Modal */}
      {selectedCliente && (
        <DeviceDistributionModal
          isOpen={postModalOpen}
          onClose={handleClosePostModal}
          title={`Postos - ${selectedCliente}`}
          data={postsByClient[selectedCliente] || []}
          type="post"
        />
      )}

      {/* Disconnection Problems */}
      <ChartCard title="Postos com Problemas de Desconexão">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Identificador (MAC e IMEI)</TableHead>
                <TableHead>Posto</TableHead>
                <TableHead>Horas Offline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disconnectionProblems.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.identificador}</TableCell>
                  <TableCell>{item.posto}</TableCell>
                  <TableCell>{item.horasOffline}h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ChartCard>

      {/* Idle Terminals and Terminals Without Post Link */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Terminais Ociosos">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Identificador</TableHead>
                  <TableHead>Posto</TableHead>
                  <TableHead>Dias sem Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {idleTerminals.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.tipo}</TableCell>
                    <TableCell>{item.identificador}</TableCell>
                    <TableCell>{item.posto}</TableCell>
                    <TableCell>{item.diasSemRegistro}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>

        <ChartCard title="Terminais sem Vínculo em Postos">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Identificador (MAC, IMEI)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terminalsWithoutPostLink.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.tipo}</TableCell>
                    <TableCell>{item.identificador}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>
      </div>

      {/* Displaced Terminals */}
      <ChartCard title="Terminais Deslocados">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Identificador</TableHead>
                <TableHead>Posto</TableHead>
                <TableHead>Geolocalização do Posto</TableHead>
                <TableHead>Geolocalização do Terminal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displacedTerminals.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.tipo}</TableCell>
                  <TableCell>{item.identificador}</TableCell>
                  <TableCell>{item.posto}</TableCell>
                  <TableCell>{item.geolocalizacaoPosto}</TableCell>
                  <TableCell>{item.geolocalizacaoTerminal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ChartCard>

      {/* Devices in Maintenance */}
      <ChartCard title="Lista de Dispositivos em Manutenção">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Identificador</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Defeito</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devicesInMaintenance.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.tipo}</TableCell>
                  <TableCell>{item.identificador}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.defeito}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ChartCard>

      {/* Maintenance Evolution and Top Defects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Evolução das Manutenções">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceEvolution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tbi" fill="hsl(var(--chart-1))" name="TBI" />
              <Bar dataKey="smart" fill="hsl(var(--chart-2))" name="Smart" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Defeitos">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Defeito</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDefects.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.defeito}</TableCell>
                    <TableCell className="text-right">{item.quantidade}</TableCell>
                    <TableCell className="text-right">{item.percentual}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default GeneralHaas;
