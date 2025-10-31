import { useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActiveFilterBadge } from "@/components/dashboard/ActiveFilterBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeviceMap } from "@/components/maps/DeviceMap";
import {
  terminalVersions,
  terminalModels,
  postsWithoutTerminals,
  terminalsInMaintenance,
  terminalsInTransport,
  disconnectionProblems,
  deviceLocations,
} from "@/lib/haasData";

const TerminalHaas = () => {
  const [activeFilter, setActiveFilter] = useState<{ type: string; value: string } | null>(null);

  const terminalDevices = deviceLocations.filter(d => d.type === 'Terminal');
  const totalTerminals = terminalDevices.length;
  const terminalsOnline = terminalDevices.filter(d => d.status === 'online').length;
  const terminalsOffline = terminalDevices.filter(d => d.status === 'offline').length;
  const terminalsMaintenance = terminalDevices.filter(d => d.status === 'maintenance').length;

  const terminalStatus = [
    { name: "Online", value: Math.round((terminalsOnline / totalTerminals) * 100), color: "hsl(var(--success))" },
    { name: "Offline", value: Math.round((terminalsOffline / totalTerminals) * 100), color: "hsl(var(--destructive))" },
  ];

  // Calculate device distribution by company for Terminal devices
  const terminalsByCompany = terminalDevices.reduce((acc, device) => {
    const empresa = device.empresa || 'Outros';
    acc[empresa] = (acc[empresa] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const terminalsByCompanyData = Object.entries(terminalsByCompany).map(([name, value], index) => ({
    name,
    value,
    color: ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'][index % 4],
  }));

  const terminalDisconnectionProblems = disconnectionProblems.filter(d => d.type === 'Terminal');

  const handleClearFilter = () => {
    setActiveFilter(null);
  };

  return (
    <div className="space-y-6">
      {activeFilter && (
        <ActiveFilterBadge
          filterType={activeFilter.type}
          filterValue={activeFilter.value}
          onClear={handleClearFilter}
        />
      )}

      {/* Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Quantidade de Terminais" value={totalTerminals} />
        <KPICard title="Terminais Online" value={terminalsOnline} />
        <KPICard title="Terminais Offline" value={terminalsOffline} />
        <KPICard title="Terminais em Manutenção" value={terminalsMaintenance} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Status do Terminal">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={terminalStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {terminalStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Versões de Software do Terminal">
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

        <ChartCard title="Versões de Modelo do Terminal">
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

      {/* Device Distribution by Company */}
      <ChartCard title="Rateio dos Terminais por Empresa">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={terminalsByCompanyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6">
              {terminalsByCompanyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Map */}
      <ChartCard title="Rastreabilidade dos Terminais">
        <DeviceMap devices={terminalDevices} />
      </ChartCard>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Postos sem Terminal">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Posto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Empresa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postsWithoutTerminals.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell className="font-medium">{item.posto}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.empresa}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>

        <ChartCard title="Terminais em Manutenção">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Posto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Desde</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terminalsInMaintenance.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell className="font-medium">{item.deviceId}</TableCell>
                    <TableCell>{item.posto}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.motivo}</TableCell>
                    <TableCell>{item.desde}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>

        <ChartCard title="Terminais em Transporte">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Posto/Destino</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Data de Envio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terminalsInTransport.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell className="font-medium">{item.deviceId}</TableCell>
                    <TableCell>{item.posto}</TableCell>
                    <TableCell>{item.origem}</TableCell>
                    <TableCell>{item.dataEnvio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>

        <ChartCard title="Terminais com Problemas de Desconexão">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Identificador (MAC e IMEI)</TableHead>
                  <TableHead>Posto</TableHead>
                  <TableHead>Horas Offline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terminalDisconnectionProblems.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell className="font-medium">{item.identificador}</TableCell>
                    <TableCell>{item.posto}</TableCell>
                    <TableCell>{item.horasOffline}h</TableCell>
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

export default TerminalHaas;
