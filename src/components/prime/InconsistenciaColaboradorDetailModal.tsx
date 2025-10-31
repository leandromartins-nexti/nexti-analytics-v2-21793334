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

interface InconsistenciaColaboradorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  posto: string;
  colaboradores: any[];
}

export function InconsistenciaColaboradorDetailModal({
  isOpen,
  onClose,
  posto,
  colaboradores,
}: InconsistenciaColaboradorDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Colaborador - {posto}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead className="text-right">Total de Inconsistências</TableHead>
              <TableHead className="text-right">Total Tratadas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.map((item) => (
              <TableRow key={item.colaborador}>
                <TableCell className="font-medium">{item.colaborador}</TableCell>
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
