import { useState } from "react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Button } from "@/components/ui/button";
import { BarChart3, Grid3x3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { coberturaVsNecessidadeSemanal, coberturaHeatmapSemanal } from "@/lib/managementData";

export function CoberturaVsNecessidade() {
  const [viewMode, setViewMode] = useState<"chart" | "heatmap">("chart");

  const toggleView = () => {
    setViewMode(viewMode === "chart" ? "heatmap" : "chart");
  };

  const getCellColor = (cobertura: number, necessidade: number) => {
    if (cobertura === necessidade) return "bg-green-500/20 text-green-700 dark:text-green-300";
    if (cobertura > necessidade) return "bg-orange-500/20 text-orange-700 dark:text-orange-300";
    return "bg-red-500/20 text-red-700 dark:text-red-300";
  };

  return (
    <ChartCard 
      title="Cobertura vs Necessidade" 
      subtitle="Visualização semanal"
      action={
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleView}
          className="gap-2"
        >
          {viewMode === "chart" ? (
            <>
              <Grid3x3 className="h-4 w-4" />
              Ver Heatmap
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4" />
              Ver Gráfico
            </>
          )}
        </Button>
      }
    >
      {viewMode === "chart" ? (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={coberturaVsNecessidadeSemanal}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="dia" 
                label={{ value: "Dia da Semana", position: "insideBottom", offset: -5 }}
              />
              <YAxis 
                label={{ value: "Colaboradores", angle: -90, position: "insideLeft" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cobertura" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
                name="Cobertura"
                dot={{ fill: "hsl(var(--chart-1))" }}
              />
              <Line 
                type="monotone" 
                dataKey="necessidade" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Necessidade"
                dot={{ fill: "hsl(var(--chart-2))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Hora</TableHead>
                <TableHead className="text-center">Dia 1</TableHead>
                <TableHead className="text-center">Dia 2</TableHead>
                <TableHead className="text-center">Dia 3</TableHead>
                <TableHead className="text-center">Dia 4</TableHead>
                <TableHead className="text-center">Dia 5</TableHead>
                <TableHead className="text-center">Dia 6</TableHead>
                <TableHead className="text-center">Dia 7</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coberturaHeatmapSemanal.map((horaData) => (
                <TableRow key={horaData.hora}>
                  <TableCell className="font-medium">{horaData.hora}</TableCell>
                  {horaData.dias.map((diaData) => (
                    <TableCell 
                      key={diaData.dia}
                      className={`text-center font-medium ${getCellColor(diaData.cobertura, diaData.necessidade)}`}
                    >
                      {diaData.cobertura}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50" />
              <span className="text-muted-foreground">Déficit (Cobertura &lt; Necessidade)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
              <span className="text-muted-foreground">OK (Cobertura = Necessidade)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500/20 border border-orange-500/50" />
              <span className="text-muted-foreground">Excesso (Cobertura &gt; Necessidade)</span>
            </div>
          </div>
        </div>
      )}
    </ChartCard>
  );
}
