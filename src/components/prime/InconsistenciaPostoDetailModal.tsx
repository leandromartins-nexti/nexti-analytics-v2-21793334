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

interface InconsistenciaPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
  onPostoClick: (posto: string) => void;
}

export function InconsistenciaPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
  onPostoClick,
}: InconsistenciaPostoDetailModalProps) {
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
              <TableHead className="text-right">Total de Inconsistências</TableHead>
              <TableHead className="text-right">Total Tratadas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postos.map((item) => (
              <TableRow 
                key={item.posto}
                className="cursor-pointer hover:bg-accent"
                onClick={() => onPostoClick(item.posto)}
              >
                <TableCell className="font-medium">{item.posto}</TableCell>
                <TableCell className="text-right">{item.totalInconsistencias}</TableCell>
                <TableCell className="text-right">{item.totalTratadas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
