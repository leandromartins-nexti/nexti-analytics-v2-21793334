/**
 * Format Utilities — Single Source of Truth for pt-BR formatting.
 * 
 * All components MUST import from here. No inline formatting with
 * .toFixed(), Intl.NumberFormat direct, or template strings.
 * 
 * Locale: pt-BR (vírgula decimal, ponto milhar)
 */

// ── Numbers ──

const numFormatter = new Intl.NumberFormat("pt-BR");

/**
 * formatNumero(9264) → "9.264"
 * formatNumero(9264.5, 1) → "9.264,5"
 */
export function formatNumero(value: number, casasDecimais = 0): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  }).format(value);
}

/**
 * formatNumeroCompacto(9264) → "9,3 mil"
 * formatNumeroCompacto(1500000) → "1,5 mi"
 * formatNumeroCompacto(2300000000) → "2,3 bi"
 */
export function formatNumeroCompacto(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    return `${sign}${formatNumero(abs / 1_000_000_000, 1)} bi`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${formatNumero(abs / 1_000_000, 1)} mi`;
  }
  if (abs >= 1_000) {
    return `${sign}${formatNumero(abs / 1_000, 1)} mil`;
  }
  return formatNumero(value);
}

// ── Percentages ──

/**
 * formatPercentual(83.2) → "83,2%"
 * formatPercentual(83.2, 0) → "83%"
 * formatPercentual(0.832, 1, true) → "83,2%"
 */
export function formatPercentual(value: number, casasDecimais = 1, isFraction = false): string {
  const v = isFraction ? value * 100 : value;
  return `${formatNumero(v, casasDecimais)}%`;
}

/**
 * formatPontosPercentuais(5.3) → "+5,3pp"
 * formatPontosPercentuais(-2.1) → "-2,1pp"
 */
export function formatPontosPercentuais(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatNumero(value, 1)}pp`;
}

// ── Variation / Trend ──

/**
 * formatVariacao(5.3, '%') → "+5,3%"
 * formatVariacao(-12, 'absoluto') → "-12"
 * formatVariacao(0.5, 'pp') → "+0,5pp"
 */
export function formatVariacao(value: number, tipo: "absoluto" | "%" | "pp"): string {
  const sign = value > 0 ? "+" : "";
  switch (tipo) {
    case "%":
      return `${sign}${formatNumero(value, 1)}%`;
    case "pp":
      return `${sign}${formatNumero(value, 1)}pp`;
    case "absoluto":
    default:
      return `${sign}${formatNumero(value)}`;
  }
}

/**
 * formatVariacaoCompleta(85.3, 80.0) → { label: "+5,3pts (+6,6%)", direction: "up" }
 */
export function formatVariacaoCompleta(
  atual: number,
  anterior: number
): { label: string; direction: "up" | "down" | "flat" } {
  const diff = atual - anterior;
  const pctChange = anterior !== 0 ? (diff / anterior) * 100 : 0;
  const direction: "up" | "down" | "flat" =
    Math.abs(diff) < 0.05 ? "flat" : diff > 0 ? "up" : "down";
  const sign = diff > 0 ? "+" : "";
  const label = `${sign}${formatNumero(diff, 1)}pts (${sign}${formatNumero(pctChange, 1)}%)`;
  return { label, direction };
}

// ── Time / Duration ──

/**
 * formatHoras(91) → "91h"
 * formatHoras(91.5) → "91h 30min"
 * formatHoras(0.25) → "15min"
 */
export function formatHoras(horas: number): string {
  if (horas < 1) {
    return `${Math.round(horas * 60)}min`;
  }
  const h = Math.floor(horas);
  const m = Math.round((horas - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

/**
 * formatDias(7.5) → "7,5 dias"
 * formatDias(1) → "1 dia"
 * formatDias(0.5) → "12h"
 */
export function formatDias(dias: number): string {
  if (dias < 1) return formatHoras(dias * 24);
  if (dias === 1) return "1 dia";
  return `${formatNumero(dias, dias % 1 === 0 ? 0 : 1)} dias`;
}

// ── Score ──

/**
 * formatScore(85.3) → "85,3 pts"
 * formatScore(85.3, 'compacto') → "85,3"
 */
export function formatScore(value: number, modo: "completo" | "compacto" = "completo"): string {
  const formatted = formatNumero(value, 1);
  return modo === "completo" ? `${formatted} pts` : formatted;
}

// ── Dates ──

const MESES_CURTOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

/**
 * formatData('2026-03-01') → "01/03/2026"
 */
export function formatData(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/**
 * formatMesAno('2026-03-01') → "mar/26"
 * formatMesAno('2026-03-01', 'longo') → "mar/2026"
 */
export function formatMesAno(iso: string, modo: "curto" | "longo" = "curto"): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  const mes = MESES_CURTOS[d.getMonth()];
  const ano = modo === "curto" ? String(d.getFullYear()).slice(-2) : String(d.getFullYear());
  return `${mes}/${ano}`;
}

/**
 * formatDataExtenso('2026-03-01') → "1 de março de 2026"
 */
export function formatDataExtenso(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return `${d.getDate()} de ${MESES_LONGOS[d.getMonth()]} de ${d.getFullYear()}`;
}

/**
 * formatPeriodo('2025-04-01', '2026-03-01') → "abr/25 – mar/26"
 */
export function formatPeriodo(inicio: string, fim: string): string {
  return `${formatMesAno(inicio)} – ${formatMesAno(fim)}`;
}

// ── Currency ──

/**
 * formatMoeda(280000) → "R$ 280.000"
 * formatMoeda(280000.5, 2) → "R$ 280.000,50"
 */
export function formatMoeda(value: number, casasDecimais = 0): string {
  return `R$ ${formatNumero(value, casasDecimais)}`;
}

/**
 * formatMoedaCompacta(280000) → "R$ 280 mil"
 * formatMoedaCompacta(2500000) → "R$ 2,5 mi"
 */
export function formatMoedaCompacta(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    return `${sign}R$ ${formatNumero(abs / 1_000_000_000, 1)} bi`;
  }
  if (abs >= 1_000_000) {
    return `${sign}R$ ${formatNumero(abs / 1_000_000, 1)} mi`;
  }
  if (abs >= 1_000) {
    return `${sign}R$ ${formatNumero(abs / 1_000, 0)} mil`;
  }
  return `${sign}R$ ${formatNumero(abs)}`;
}

// ── Plurals ──

/**
 * plural(1, 'colaborador', 'colaboradores') → "1 colaborador"
 * plural(9, 'colaborador', 'colaboradores') → "9 colaboradores"
 */
export function plural(qtd: number, singular: string, pluralForm: string): string {
  return `${formatNumero(qtd)} ${qtd === 1 ? singular : pluralForm}`;
}
