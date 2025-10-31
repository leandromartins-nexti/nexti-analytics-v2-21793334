import { useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActiveFilterBadge } from "@/components/dashboard/ActiveFilterBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeviceMap } from "@/components/maps/DeviceMap";
import {
  deviceStatus,
  smartVersions,
  postsWithoutSmarts,
  devicesOutOfPerimeter,
  disconnectionProblems,
  deviceLocations,
} from "@/lib/haasData";

const SmartHaas = () => {
  const [activeFilter, setActiveFilter] = useState<{ type: string; value: string } | null>(null);

  const smartDevices = deviceLocations.filter(d => d.type === 'Smart');
  const totalSmarts = smartDevices.length;
  const smartsOnline = smartDevices.filter(d => d.status === 'online').length;
  const smartsOffline = smartDevices.filter(d => d.status === 'offline').length;
  const smartsMaintenance = smartDevices.filter(d => d.status === 'maintenance').length;

  const smartStatus = [
    { name: "Online", value: Math.round((smartsOnline / totalSmarts) * 100), color: "hsl(var(--success))" },
    { name: "Offline", value: Math.round((smartsOffline / totalSmarts) * 100), color: "hsl(var(--destructive))" },
  ];

  // Calculate device distribution by company for Smart devices
  const smartsByCompany = smartDevices.reduce((acc, device) => {
    const empresa = device.empresa || 'Outros';
    acc[empresa] = (acc[empresa] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const smartsByCompanyData = Object.entries(smartsByCompany).map(([name, value], index) => ({
    name,
    value,
    color: ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'][index % 4],
  }));

  const smartsOutOfPerimeter = devicesOutOfPerimeter.filter(d => d.type === 'Nexti Smart');
  const smartDisconnectionProblems = disconnectionProblems.filter(d => d.type === 'Smart');

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
        <KPICard title="Quantidade de Smarts" value={totalSmarts} />
        <KPICard title="Smarts Online" value={smartsOnline} />
        <KPICard title="Smarts Offline" value={smartsOffline} />
        <KPICard title="Smarts em Manutenção" value={smartsMaintenance} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Status do Smart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={smartStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {smartStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Versões de Software do Smart">
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
      </div>

      {/* Device Distribution by Company */}
      <ChartCard title="Rateio dos Smarts por Empresa">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={smartsByCompanyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6">
              {smartsByCompanyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Map */}
      <ChartCard title="Rastreabilidade dos Smarts">
        <DeviceMap devices={smartDevices} />
      </ChartCard>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Postos sem Smart">
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
                {postsWithoutSmarts.map((item) => (
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

        <ChartCard title="Smarts Fora do Perímetro">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Posto</TableHead>
                  <TableHead>Última Localização</TableHead>
                  <TableHead>Distância</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {smartsOutOfPerimeter.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell className="font-medium">{item.deviceId}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.post}</TableCell>
                    <TableCell>{item.lastLocation}</TableCell>
                    <TableCell>{item.distance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>

        <ChartCard title="Smarts com Problemas de Desconexão">
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
                {smartDisconnectionProblems.map((item) => (
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

export default SmartHaas;
