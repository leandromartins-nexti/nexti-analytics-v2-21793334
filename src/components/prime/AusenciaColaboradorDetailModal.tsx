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

interface AusenciaColaboradorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  posto: string;
  colaboradores: any[];
  tipo: "ausencias" | "absenteismo";
}

export function AusenciaColaboradorDetailModal({
  isOpen,
  onClose,
  posto,
  colaboradores,
  tipo,
}: AusenciaColaboradorDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Colaborador - {posto}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead className="text-right">Total de Horas</TableHead>
              <TableHead className="text-right">% Absenteísmo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.map((item) => (
              <TableRow key={item.colaborador}>
                <TableCell className="font-medium">{item.colaborador}</TableCell>
                <TableCell className="text-right">{item.totalHoras}h</TableCell>
                <TableCell className="text-right">
                  <span className="text-destructive font-semibold">
                    {item.percentualAbsenteismo}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
