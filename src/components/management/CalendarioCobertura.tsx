import { ChartCard } from "@/components/dashboard/ChartCard";
import { CoberturaDiaria } from "@/lib/managementData";
import { cn } from "@/lib/utils";

interface CalendarioCoberturaProps {
  data: CoberturaDiaria[];
}

export function CalendarioCobertura({ data }: CalendarioCoberturaProps) {
  const hoje = new Date().getDate();
  const diasNoMes = 31; // Simplificado para o exemplo
  const primeiroDiaSemana = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

  const getCoberturaColor = (cobertura: number) => {
    if (cobertura > 95) return "bg-success text-success-foreground";
    if (cobertura > 80) return "bg-success/60 text-success-foreground";
    if (cobertura > 65) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getDiaCobertura = (dia: number): CoberturaDiaria | undefined => {
    return data.find(d => d.dia === dia);
  };

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <ChartCard title="Calendário de Cobertura Mensal">
      <div className="space-y-4">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-2">
          {diasSemana.map((dia) => (
            <div key={dia} className="text-center text-sm font-medium text-muted-foreground py-2">
              {dia}
            </div>
          ))}
        </div>

        {/* Grid do calendário */}
        <div className="grid grid-cols-7 gap-2">
          {/* Espaços vazios antes do primeiro dia */}
          {Array.from({ length: primeiroDiaSemana }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* Dias do mês */}
          {Array.from({ length: diasNoMes }).map((_, index) => {
            const dia = index + 1;
            const cobertura = getDiaCobertura(dia);
            const isPast = dia < hoje;
            const isToday = dia === hoje;

            return (
              <div
                key={dia}
                className={cn(
                  "aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-2 transition-all",
                  isPast && cobertura ? getCoberturaColor(cobertura.coberturaPercentual) : "bg-muted/30 border-border",
                  isToday && "border-primary ring-2 ring-primary/20",
                  !isPast && !isToday && "border-border/50 opacity-50"
                )}
              >
                <div className="text-sm font-bold">{dia}</div>
                {isPast && cobertura && (
                  <div className="text-xs font-medium mt-1">
                    {cobertura.coberturaPercentual.toFixed(1)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-4 justify-center pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success" />
            <span className="text-sm text-muted-foreground">&gt; 95%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success/60" />
            <span className="text-sm text-muted-foreground">80-95%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning" />
            <span className="text-sm text-muted-foreground">65-80%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive" />
            <span className="text-sm text-muted-foreground">≤ 65%</span>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
