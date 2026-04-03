import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { coberturaRiscoV3, formatCurrencyV3, formatNumberV3 } from "@/lib/analyticsV3Data";
import { TrendingUp, TrendingDown, Minus, ShieldAlert } from "lucide-react";

export default function V3CoberturasRiscoTab() {
  const d = coberturaRiscoV3;
  const scoreClass = (s: number) => s >= 85 ? "text-green-600" : s >= 70 ? "text-amber-600" : "text-red-600";
  const scoreBg = (s: number) => s >= 85 ? "bg-green-50 border-green-200" : s >= 70 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";
  const scoreLabel = (s: number) => s >= 85 ? "Saudável" : s >= 70 ? "Atenção" : "Risco Elevado";

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Coberturas e Continuidade Operacional</h2>

      <div className={`rounded-xl border p-5 ${scoreBg(d.scoreEficiencia)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Score de Eficiência de Cobertura</p>
            <p className={`text-4xl font-bold ${scoreClass(d.scoreEficiencia)}`}>{d.scoreEficiencia}</p>
            <p className="text-sm text-muted-foreground mt-1">{scoreLabel(d.scoreEficiencia)}</p>
          </div>
          <ShieldAlert className={`w-10 h-10 ${scoreClass(d.scoreEficiencia)}`} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Taxa Cobertura Efetiva" value={`${d.taxaCoberturaEfetiva}%`} color="text-blue-600" />
        <KPI label="% Reserva Técnica" value={`${d.pctReservaTecnica}%`} color="text-green-600" />
        <KPI label="% Hora Extra" value={`${d.pctHoraExtra}%`} color="text-red-600" />
        <KPI label="Tempo Médio Reposição" value={`${d.tempoMedioReposicao}h`} color="text-foreground" />
        <KPI label="Horas Posto Descoberto" value={formatNumberV3(d.horasPostoDescoberto)} color="text-red-600" />
        <KPI label="Risco Potencial de Glosa" value={formatCurrencyV3(d.riscoPotencialGlosa)} color="text-red-600" />
        <KPI label="Custo Total de Cobertura" value={formatCurrencyV3(d.custoTotalCobertura)} color="text-foreground" />
        <KPI label="Score Eficiência" value={String(d.scoreEficiencia)} color={scoreClass(d.scoreEficiencia)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Distribuição por Tipo de Cobertura</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={d.tiposCobertura} dataKey="quantidade" nameKey="tipo" cx="50%" cy="50%" outerRadius={90} label={({ pct }) => `${pct}%`} fontSize={10}>
                {d.tiposCobertura.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number, name: string, props: any) => [`${v} (${props.payload.pct}%)`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1">
            {d.tiposCobertura.map(t => (
              <div key={t.tipo} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-muted-foreground">{t.tipo}</span>
                </div>
                <span className={t.impactoScore === "positivo" ? "text-green-600" : t.impactoScore === "negativo" ? "text-red-600" : "text-muted-foreground"}>
                  {t.impactoScore === "positivo" ? "↑ Score" : t.impactoScore === "negativo" ? "↓ Score" : "Neutro"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Evolução por Competência</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={d.evolucaoMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="mes" fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend fontSize={11} />
              <Area type="monotone" dataKey="planejada" fill="#16a34a" fillOpacity={0.2} stroke="#16a34a" name="Planejada" />
              <Area type="monotone" dataKey="emergencial" fill="#f97316" fillOpacity={0.2} stroke="#f97316" name="Emergencial" />
              <Area type="monotone" dataKey="descoberto" fill="#ef4444" fillOpacity={0.2} stroke="#ef4444" name="Descoberto (horas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Comparativo por Regional</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs">Regional</th>
              <th className="text-center px-3 py-3 font-semibold text-muted-foreground text-xs">Score</th>
              <th className="text-right px-3 py-3 font-semibold text-muted-foreground text-xs">Custo Cobertura</th>
              <th className="text-right px-3 py-3 font-semibold text-muted-foreground text-xs">Horas Descoberto</th>
              <th className="text-center px-3 py-3 font-semibold text-muted-foreground text-xs">Tendência</th>
            </tr>
          </thead>
          <tbody>
            {d.porEstrutura.map(e => (
              <tr key={e.nome} className="border-b border-border/50 hover:bg-muted/40">
                <td className="px-4 py-3 font-medium text-foreground">{e.nome}</td>
                <td className="px-3 py-3 text-center"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${e.score >= 80 ? "bg-green-50 text-green-600" : e.score >= 70 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>{e.score}</span></td>
                <td className="px-3 py-3 text-right text-muted-foreground">{formatCurrencyV3(e.custoCobertura)}</td>
                <td className="px-3 py-3 text-right text-muted-foreground">{formatNumberV3(e.horasDescoberto)}</td>
                <td className="px-3 py-3 text-center">
                  {e.tendencia === "up" ? <TrendingUp className="w-4 h-4 text-green-500 mx-auto" /> : e.tendencia === "down" ? <TrendingDown className="w-4 h-4 text-red-500 mx-auto" /> : <Minus className="w-4 h-4 text-muted-foreground mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPI({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
