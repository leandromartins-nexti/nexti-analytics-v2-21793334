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

interface Cliente {
  cliente: string;
  cnpj: string;
  admissoes: number;
  desligamentos: number;
  turnover: number;
}

interface TurnoverClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: Cliente[];
  onClienteClick: (cliente: string) => void;
}

export function TurnoverClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
}: TurnoverClienteDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Turnover - {empresa}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead className="text-right">Admissões</TableHead>
              <TableHead className="text-right">Desligamentos</TableHead>
              <TableHead className="text-right">Turnover (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((item) => (
              <TableRow
                key={item.cliente}
                className="cursor-pointer hover:bg-accent"
                onClick={() => onClienteClick(item.cliente)}
              >
                <TableCell className="font-medium">{item.cliente}</TableCell>
                <TableCell>{item.cnpj}</TableCell>
                <TableCell className="text-right">{item.admissoes}</TableCell>
                <TableCell className="text-right">{item.desligamentos}</TableCell>
                <TableCell className="text-right">{item.turnover}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
