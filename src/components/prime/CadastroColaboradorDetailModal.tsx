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

interface CadastroColaboradorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  posto: string;
  colaboradores: any[];
}

export function CadastroColaboradorDetailModal({
  isOpen,
  onClose,
  posto,
  colaboradores,
}: CadastroColaboradorDetailModalProps) {
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
              <TableHead className="text-right">Cadastro Faltante</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.map((item) => (
              <TableRow key={item.colaborador}>
                <TableCell className="font-medium">{item.colaborador}</TableCell>
                <TableCell className="text-right">{item.cadastroFaltante}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
