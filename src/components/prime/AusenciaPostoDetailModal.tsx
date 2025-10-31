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

interface AusenciaPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
  tipo: "ausencias" | "absenteismo";
  onPostoClick: (posto: string) => void;
}

export function AusenciaPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
  tipo,
  onPostoClick,
}: AusenciaPostoDetailModalProps) {
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
              {tipo === "ausencias" ? (
                <TableHead className="text-right">Total de Horas</TableHead>
              ) : (
                <TableHead className="text-right">% Absenteísmo</TableHead>
              )}
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
