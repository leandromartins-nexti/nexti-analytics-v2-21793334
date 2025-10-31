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

interface EventosExcedentesPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
}

export function EventosExcedentesPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
}: EventosExcedentesPostoDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Posto - {cliente}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posto</TableHead>
              <TableHead>CC</TableHead>
              <TableHead className="text-right">Número de Eventos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postos.map((item) => (
              <TableRow key={item.posto}>
                <TableCell className="font-medium">{item.posto}</TableCell>
                <TableCell>{item.cc}</TableCell>
                <TableCell className="text-right">{item.numeroEventos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
