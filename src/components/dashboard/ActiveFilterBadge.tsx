import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveFilterBadgeProps {
  filterType: string;
  filterValue: string;
  onClear: () => void;
  className?: string;
}

export function ActiveFilterBadge({ filterType, filterValue, onClear, className }: ActiveFilterBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2 p-4 bg-primary/10 border-2 border-primary rounded-lg", className)}>
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">Filtro Ativo</p>
        <p className="text-lg font-bold text-primary">
          {filterType}: <span className="text-foreground">{filterValue}</span>
        </p>
      </div>
      <button
        onClick={onClear}
        className="p-2 hover:bg-destructive/10 rounded-full transition-colors group"
        aria-label="Limpar filtro"
      >
        <X className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
      </button>
    </div>
  );
}
