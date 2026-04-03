import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, ReferenceLine } from "recharts";
import { getEvolucaoConsolidada, formatCurrencyV3, getEvolucaoOperacional, getScoreOperacional, getNivelConfianca, disciplinaOperacionalV3, absenteismoV3 } from "@/lib/analyticsV3Data";

export default function V3EvolucaoTab() {
  const evolucao = getEvolucaoConsolidada();
  const evolucaoOp = getEvolucaoOperacional();
  const mediaEconomia = Math.round(evolucao.reduce((s, e) => s + e.economiaGerada, 0) / evolucao.length);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Evolução da Operação</h2>
      <p className="text-sm text-muted-foreground">abr/2025 – mar/2026 · Maturidade operacional e financeira ao longo do período</p>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Economia Gerada por Competência</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={evolucao}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="mes" fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => formatCurrencyV3(v)} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <ReferenceLine y={mediaEconomia} stroke="hsl(var(--muted-foreground))" strokeDasharray="6 3" strokeWidth={1.5} />
            <Area type="monotone" dataKey="economiaGerada" fill="hsl(var(--primary))" fillOpacity={0.15} stroke="hsl(var(--primary))" strokeWidth={2} name="Economia Gerada" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Qualidade do Ponto por Competência</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={evolucaoOp}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="mes" fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 95]} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="qualidadePonto" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} name="Qualidade do Ponto" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Absenteísmo por Competência</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={evolucaoOp}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="mes" fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="absenteismo" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} name="Absenteísmo" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Nível de Confiança por Competência</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={evolucao}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="mes" fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => formatCurrencyV3(v)} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Area type="monotone" dataKey="comprovado" stackId="1" fill="#16a34a" fillOpacity={0.4} stroke="#16a34a" name="Comprovado" />
            <Area type="monotone" dataKey="hibrido" stackId="1" fill="#ca8a04" fillOpacity={0.3} stroke="#ca8a04" name="Híbrido" />
            <Area type="monotone" dataKey="referencial" stackId="1" fill="#9333ea" fillOpacity={0.2} stroke="#9333ea" name="Referencial" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
