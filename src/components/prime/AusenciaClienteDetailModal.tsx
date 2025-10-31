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

interface AusenciaClienteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  clientes: any[];
  onClienteClick: (cliente: string) => void;
  tipo: "ausencias" | "absenteismo";
}

export function AusenciaClienteDetailModal({
  isOpen,
  onClose,
  empresa,
  clientes,
  onClienteClick,
  tipo,
}: AusenciaClienteDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhamento por Cliente - {empresa}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              {tipo === "ausencias" ? (
                <TableHead className="text-right">Total de Horas</TableHead>
              ) : (
                <TableHead className="text-right">% Absenteísmo</TableHead>
              )}
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
                {tipo === "ausencias" ? (
                  <TableCell className="text-right">{item.totalHoras}h</TableCell>
                ) : (
                  <TableCell className="text-right">
                    <span className="text-destructive font-semibold">
                      {item.percentualAbsenteismo}%
                    </span>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
