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

interface SolicitacaoClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: any[];
  onClienteClick: (cliente: string) => void;
}

export function SolicitacaoClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
}: SolicitacaoClienteDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Cliente - {empresa}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-right">Total de Solicitações</TableHead>
              <TableHead className="text-right">Total Tratadas</TableHead>
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
                <TableCell className="text-right">{item.totalSolicitacoes}</TableCell>
                <TableCell className="text-right">{item.totalTratadas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
