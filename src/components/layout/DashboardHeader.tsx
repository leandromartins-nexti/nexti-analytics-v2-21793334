import { Calendar, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilters } from "@/contexts/FilterContext";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title: string;
  breadcrumbs?: string[];
}

export function DashboardHeader({ title, breadcrumbs = [] }: DashboardHeaderProps) {
  const { filters, removeFilter, clearFilters, hasFilters } = useFilters();

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{crumb}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        {hasFilters && (
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-2 max-w-md">
              {filters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-1 cursor-pointer hover:bg-destructive/20"
                  onClick={() => removeFilter(filter)}
                >
                  <span className="text-xs">{filter.label}</span>
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Limpar filtros
            </Button>
          </div>
        )}

        <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Período
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Selecionar Período</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Últimos 7 dias
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Últimos 30 dias
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Últimos 3 meses
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Últimos 12 meses
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      </div>
    </header>
  );
}
