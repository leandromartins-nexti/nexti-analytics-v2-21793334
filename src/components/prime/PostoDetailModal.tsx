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

interface PostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
  onPostoClick?: (posto: string) => void;
}

export function PostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
  onPostoClick,
}: PostoDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Posto - {cliente}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posto</TableHead>
              <TableHead className="text-right">Total de Inconsistências</TableHead>
              <TableHead className="text-right">Qualidade da Marcação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postos.map((item) => (
              <TableRow 
                key={item.posto}
                className={onPostoClick ? "cursor-pointer hover:bg-accent" : ""}
                onClick={() => onPostoClick?.(item.posto)}
              >
                <TableCell className="font-medium">{item.posto}</TableCell>
                <TableCell className="text-right">{item.totalInconsistencias}</TableCell>
                <TableCell className="text-right text-green-600 font-semibold">
                  {item.qualidadeMarcacao}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
