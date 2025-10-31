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

interface EngajamentoPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
  onPostoClick: (posto: string) => void;
}

export function EngajamentoPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
  onPostoClick,
}: EngajamentoPostoDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Posto - {cliente}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posto</TableHead>
              <TableHead className="text-right">Engajamento Avisos</TableHead>
              <TableHead className="text-right">Engajamento Convocações</TableHead>
              <TableHead className="text-right">Engajamento Geral</TableHead>
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
                <TableCell className="text-right font-semibold text-blue-600">
                  {item.engajamentoAvisos.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-semibold text-purple-600">
                  {item.engajamentoConvocacoes.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  {item.engajamentoGeral.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
