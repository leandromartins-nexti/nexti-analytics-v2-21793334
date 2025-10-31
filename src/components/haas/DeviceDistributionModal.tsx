import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClientData {
  cliente: string;
  cnpj: string;
  tablets: number;
  tbis: number;
}

interface PostData {
  posto: string;
  cc: string;
  tablets: number;
  tbis: number;
}

interface DeviceDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: ClientData[] | PostData[];
  type: 'client' | 'post';
  onRowClick?: (rowName: string) => void;
}

export function DeviceDistributionModal({ 
  isOpen, 
  onClose, 
  title, 
  data, 
  type,
  onRowClick 
}: DeviceDistributionModalProps) {
  const isClientData = type === 'client';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isClientData ? "Cliente" : "Posto"}</TableHead>
                {isClientData && <TableHead>CNPJ</TableHead>}
                {!isClientData && <TableHead>CC</TableHead>}
                <TableHead>Tablets</TableHead>
                <TableHead>TBIs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => {
                const isClient = 'cliente' in row;
                const isPost = 'posto' in row;
                const rowName = isClient ? row.cliente : isPost ? row.posto : '';
                
                return (
                  <TableRow 
                    key={index}
                    className={onRowClick && isClientData ? "cursor-pointer hover:bg-muted/50" : ""}
                    onClick={() => onRowClick && isClientData ? onRowClick(rowName) : undefined}
                  >
                    <TableCell className="font-medium">{rowName}</TableCell>
                    {isClientData && isClient && <TableCell>{row.cnpj}</TableCell>}
                    {!isClientData && isPost && <TableCell>{row.cc}</TableCell>}
                    <TableCell>{row.tablets}</TableCell>
                    <TableCell>{row.tbis}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
