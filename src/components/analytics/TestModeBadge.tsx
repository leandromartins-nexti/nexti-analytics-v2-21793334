// TODO: REMOVER EM PRODUÇÃO
// Badge visual discreto no header indicando o cliente ativo no modo de teste.

import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCustomer, getCustomerColor } from "@/contexts/CustomerContext";

export default function TestModeBadge() {
  const { customerId } = useCustomer();
  const color = getCustomerColor(customerId);

  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <span
          className="inline-block w-2.5 h-2.5 rounded-full ring-2 ring-white cursor-help shrink-0"
          style={{ backgroundColor: color }}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        Modo teste: Cliente {customerId}
      </TooltipContent>
    </UITooltip>
  );
}
