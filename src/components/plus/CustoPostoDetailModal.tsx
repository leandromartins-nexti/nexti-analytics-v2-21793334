import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Posto {
  cc: string;
  nome: string;
  custo: number;
  perCapita: number;
  variacao: number;
}

interface CustoPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: Posto[];
}

export function CustoPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
}: CustoPostoDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Custos por Posto - {cliente}
          </DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CC</TableHead>
              <TableHead>Posto</TableHead>
              <TableHead className="text-right">Custo (R$)</TableHead>
              <TableHead className="text-right">Per Capita (R$)</TableHead>
              <TableHead className="text-right">Variação (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postos.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.cc}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell className="text-right">
                  {item.custo.toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="text-right">
                  {item.perCapita.toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {item.variacao > 0 ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                    <span
                      className={
                        item.variacao > 0
                          ? "text-destructive"
                          : "text-success"
                      }
                    >
                      {Math.abs(item.variacao)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
