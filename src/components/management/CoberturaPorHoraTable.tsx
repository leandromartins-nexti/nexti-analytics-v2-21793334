import { useState } from "react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CoberturaPorHora } from "@/lib/managementData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CoberturaPorHoraTableProps {
  data: CoberturaPorHora[];
}

export function CoberturaPorHoraTable({ data }: CoberturaPorHoraTableProps) {
  const [selectedHora, setSelectedHora] = useState<CoberturaPorHora | null>(null);

  const handleRowClick = (hora: CoberturaPorHora) => {
    if (hora.possivelmenteFaltantes.length > 0) {
      setSelectedHora(hora);
    }
  };

  return (
    <>
      <ChartCard title="Cobertura por Hora">
        <div className="overflow-auto max-h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead className="text-right">Colaboradores</TableHead>
                <TableHead className="text-right">Cobertura</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.hora}
                  className={item.possivelmenteFaltantes.length > 0 ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => handleRowClick(item)}
                >
                  <TableCell className="font-medium">{item.hora}</TableCell>
                  <TableCell className="text-right">{item.colaboradores}</TableCell>
                  <TableCell className="text-right">
                    <span className={
                      item.coberturaPercentual >= 95 ? "text-success font-medium" :
                      item.coberturaPercentual >= 80 ? "text-primary font-medium" :
                      item.coberturaPercentual >= 65 ? "text-warning font-medium" :
                      "text-destructive font-medium"
                    }>
                      {item.coberturaPercentual.toFixed(2)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ChartCard>

      <Dialog open={!!selectedHora} onOpenChange={() => setSelectedHora(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Possivelmente Faltantes - {selectedHora?.hora}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              Total: {selectedHora?.possivelmenteFaltantes.length} colaborador(es)
            </p>
            <div className="space-y-2">
              {selectedHora?.possivelmenteFaltantes.map((nome, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Badge variant="destructive" className="shrink-0">Faltante</Badge>
                  <span className="font-medium">{nome}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
