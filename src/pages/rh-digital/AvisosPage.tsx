import { RhDigitalProvider } from "@/contexts/RhDigitalContext";
import AvisosConvocacoesTab from "./AvisosConvocacoesTab";

export default function AvisosPage() {
  return (
    <RhDigitalProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Avisos e Convocações</h1>
          <p className="text-muted-foreground">Compliance e Aderência na Comunicação Formal</p>
        </div>
        <AvisosConvocacoesTab />
      </div>
    </RhDigitalProvider>
  );
}
