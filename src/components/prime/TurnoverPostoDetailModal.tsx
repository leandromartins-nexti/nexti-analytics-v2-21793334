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

interface Posto {
  posto: string;
  cc: string;
  admissoes: number;
  desligamentos: number;
  turnover: number;
}

interface TurnoverPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: Posto[];
}

export function TurnoverPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
}: TurnoverPostoDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Postos - {cliente}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posto</TableHead>
              <TableHead>CC</TableHead>
              <TableHead className="text-right">Admissões</TableHead>
              <TableHead className="text-right">Desligamentos</TableHead>
              <TableHead className="text-right">Turnover (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postos.map((item) => (
              <TableRow key={item.posto}>
                <TableCell className="font-medium">{item.posto}</TableCell>
                <TableCell>{item.cc}</TableCell>
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
