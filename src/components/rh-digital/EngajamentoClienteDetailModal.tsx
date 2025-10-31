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

interface EngajamentoClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: any[];
  onClienteClick: (cliente: string) => void;
}

export function EngajamentoClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
}: EngajamentoClienteDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Cliente - {empresa}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-right">Engajamento Avisos</TableHead>
              <TableHead className="text-right">Engajamento Convocações</TableHead>
              <TableHead className="text-right">Engajamento Geral</TableHead>
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
