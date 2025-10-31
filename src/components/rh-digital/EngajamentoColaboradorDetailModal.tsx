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

interface EngajamentoColaboradorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  posto: string;
  colaboradores: any[];
}

export function EngajamentoColaboradorDetailModal({
  isOpen,
  onClose,
  posto,
  colaboradores,
}: EngajamentoColaboradorDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Colaborador - {posto}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead className="text-right">Engajamento Avisos</TableHead>
              <TableHead className="text-right">Engajamento Convocações</TableHead>
              <TableHead className="text-right">Engajamento Geral</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.map((item) => (
              <TableRow key={item.colaborador}>
                <TableCell className="font-medium">{item.colaborador}</TableCell>
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
