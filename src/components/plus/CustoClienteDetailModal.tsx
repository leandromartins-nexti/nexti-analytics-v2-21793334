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

interface Cliente {
  cliente: string;
  cnpj: string;
  custo: number;
  perCapita: number;
  variacao: number;
}

interface CustoClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: Cliente[];
  onClienteClick: (cliente: string) => void;
}

export function CustoClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
}: CustoClienteDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Custos por Cliente - {empresa}
          </DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead className="text-right">Custo (R$)</TableHead>
                <TableHead className="text-right">Per Capita (R$)</TableHead>
                <TableHead className="text-right">Variação (%)</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((item, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-accent"
                onClick={() => onClienteClick(item.cliente)}
              >
                <TableCell className="font-medium">{item.cliente}</TableCell>
                <TableCell>{item.cnpj}</TableCell>
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
