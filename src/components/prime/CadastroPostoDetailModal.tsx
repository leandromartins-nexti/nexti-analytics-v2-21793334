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

interface CadastroPostoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: string;
  postos: any[];
  onPostoClick: (posto: string) => void;
}

export function CadastroPostoDetailModal({
  isOpen,
  onClose,
  cliente,
  postos,
  onPostoClick,
}: CadastroPostoDetailModalProps) {
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
              <TableHead className="text-right">% Sem Biometria/Senha</TableHead>
              <TableHead className="text-right">Colaboradores Sem Facial</TableHead>
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
                <TableCell className="text-right">{item.percentualSemBiometriaSenha}%</TableCell>
                <TableCell className="text-right">{item.colaboradoresSemFacial}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
