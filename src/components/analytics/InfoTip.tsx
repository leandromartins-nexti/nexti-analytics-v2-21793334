import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function InfoTip({ text }: { text: string }) {
  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <Info size={14} className="text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[280px] text-xs">{text}</TooltipContent>
    </UITooltip>
  );
}
