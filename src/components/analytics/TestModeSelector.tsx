// TODO: REMOVER EM PRODUÇÃO
// Seção "Modo de Teste" na tela de Configuração.
// Em produção, o customer_id deve vir do contexto OAuth2/JWT via subdomain.

import { useCustomer } from "@/contexts/CustomerContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench } from "lucide-react";

export default function TestModeSelector() {
  const { customerId, customers, setCustomerId } = useCustomer();

  return (
    <div className="border-2 border-dashed border-amber-300 bg-amber-50/60 rounded-xl p-5 mb-6">
      <div className="flex items-start gap-3">
        <Wrench className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-sm font-bold text-amber-800">
              Modo de Teste <span className="text-[10px] font-normal text-amber-600">(será removido em produção)</span>
            </h3>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Em produção, o cliente é identificado automaticamente pelo subdomain de acesso (ex: vigeyes.nexti.com) e via OAuth2.
              Esta seleção persiste no navegador até ser trocada.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-amber-800">Cliente ativo:</span>
            <Select
              value={String(customerId)}
              onValueChange={(v) => setCustomerId(Number(v))}
            >
              <SelectTrigger className="w-48 h-8 text-xs bg-white border-amber-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.customer_id} value={String(c.customer_id)}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
