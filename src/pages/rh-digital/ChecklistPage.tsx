import { RhDigitalProvider } from "@/contexts/RhDigitalContext";
import ChecklistTab from "./ChecklistTab";

export default function ChecklistPage() {
  return (
    <RhDigitalProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Checklist Operacional</h1>
          <p className="text-muted-foreground">Monitoramento de Compliance Operacional em Campo</p>
        </div>
        <ChecklistTab />
      </div>
    </RhDigitalProvider>
  );
}
