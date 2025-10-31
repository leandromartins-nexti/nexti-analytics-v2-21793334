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

interface EventosExcedentesClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: any[];
  onClienteClick: (cliente: string) => void;
}

export function EventosExcedentesClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
}: EventosExcedentesClienteDetailModalProps) {
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
              <TableHead>CNPJ</TableHead>
              <TableHead className="text-right">Número de Eventos</TableHead>
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
                <TableCell className="text-right">{item.numeroEventos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
