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

interface DispositivoPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
}

export function DispositivoPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
}: DispositivoPostoDetailModalProps) {
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
              <TableHead className="text-right">Aplicativo</TableHead>
              <TableHead className="text-right">TBI</TableHead>
              <TableHead className="text-right">Smart</TableHead>
              <TableHead className="text-right">WEB</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postos.map((item) => (
              <TableRow key={item.posto}>
                <TableCell className="font-medium">{item.posto}</TableCell>
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
