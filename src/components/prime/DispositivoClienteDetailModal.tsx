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

interface DispositivoClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: any[];
  onClienteClick: (cliente: string) => void;
}

export function DispositivoClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
}: DispositivoClienteDetailModalProps) {
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
              <TableHead className="text-right">Aplicativo</TableHead>
              <TableHead className="text-right">TBI</TableHead>
              <TableHead className="text-right">Smart</TableHead>
              <TableHead className="text-right">WEB</TableHead>
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
                <TableCell className="text-right">{item.aplicativo}</TableCell>
                <TableCell className="text-right">{item.tbi}</TableCell>
                <TableCell className="text-right">{item.smart}</TableCell>
                <TableCell className="text-right">{item.web}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
