import { RhDigitalProvider } from "@/contexts/RhDigitalContext";
import DirectChatTab from "./DirectChatTab";

export default function DirectPage() {
  return (
    <RhDigitalProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nexti Direct (Suporte)</h1>
          <p className="text-muted-foreground">Monitoramento de Eficiência e Satisfação do Atendimento</p>
        </div>
        <DirectChatTab />
      </div>
    </RhDigitalProvider>
  );
}
