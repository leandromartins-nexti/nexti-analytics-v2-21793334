import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  qualidadeEmpresaData, qualidadeUnidadeData, qualidadeAreaData,
  composicaoEmpresaData, composicaoUnidadeData, composicaoAreaData,
} from "@/lib/ajustesData";

export interface ScoreConfig {
  weight_quality: number;
  weight_treatment: number;
  grade_under_1d: number;
  grade_1_3d: number;
  grade_3_7d: number;
  grade_7_15d: number;
  grade_over_15d: number;
  threshold_excellent: number;
  threshold_good: number;
  threshold_warning: number;
  threshold_poor: number;
}

export const DEFAULT_CONFIG: ScoreConfig = {
  weight_quality: 70,
  weight_treatment: 30,
  grade_under_1d: 100,
  grade_1_3d: 75,
  grade_3_7d: 50,
  grade_7_15d: 20,
  grade_over_15d: 0,
  threshold_excellent: 85,
  threshold_good: 70,
  threshold_warning: 55,
  threshold_poor: 40,
};

export function getScoreClassification(score: number, config: ScoreConfig) {
  if (score >= config.threshold_excellent) return { label: "Excelente", color: "#22c55e", bg: "bg-green-100", text: "text-green-600" };
  if (score >= config.threshold_good) return { label: "Bom", color: "#84cc16", bg: "bg-lime-100", text: "text-lime-600" };
  if (score >= config.threshold_warning) return { label: "Atenção", color: "#f97316", bg: "bg-orange-100", text: "text-orange-600" };
  if (score >= config.threshold_poor) return { label: "Ruim", color: "#f87171", bg: "bg-red-100", text: "text-red-500" };
  return { label: "Crítico", color: "#ef4444", bg: "bg-red-200", text: "text-red-600" };
}

/** Compute treatment score from composition data for a given entity/groupBy */
export function computeTreatmentScore(
  selectedName: string | null,
  groupBy: "empresa" | "unidade" | "area",
  config: ScoreConfig
): { score: number; pctUnder1d: number; pct1_3d: number; pct3_7d: number; pct7_15d: number; pctOver15d: number } {
  type Row = { name: string; total: number; f1: number; f2: number; f3: number; f4: number; f5: number };
  let rows: Row[];
  if (groupBy === "unidade") {
    rows = composicaoUnidadeData.map(r => ({ name: r.company_name, total: r.total_ajustes, f1: r.faixa_ate_1_dia, f2: r.faixa_1_3_dias, f3: r.faixa_3_7_dias, f4: r.faixa_7_15_dias, f5: r.faixa_mais_15_dias }));
  } else if (groupBy === "area") {
    rows = composicaoAreaData.map(r => ({ name: r.company_name, total: r.total_ajustes, f1: r.faixa_ate_1_dia, f2: r.faixa_1_3_dias, f3: r.faixa_3_7_dias, f4: r.faixa_7_15_dias, f5: r.faixa_mais_15_dias }));
  } else {
    rows = composicaoEmpresaData.map(r => ({ name: r.company_name, total: r.total_ajustes, f1: r.faixa_ate_1_dia, f2: r.faixa_1_3_dias, f3: r.faixa_3_7_dias, f4: r.faixa_7_15_dias, f5: r.faixa_mais_15_dias }));
  }

  const filtered = selectedName ? rows.filter(r => r.name === selectedName) : rows;
  let totalF1 = 0, totalF2 = 0, totalF3 = 0, totalF4 = 0, totalF5 = 0, totalAll = 0;
  for (const r of filtered) {
    totalF1 += r.f1; totalF2 += r.f2; totalF3 += r.f3; totalF4 += r.f4; totalF5 += r.f5;
    totalAll += r.f1 + r.f2 + r.f3 + r.f4 + r.f5;
  }

  if (totalAll === 0) return { score: 0, pctUnder1d: 0, pct1_3d: 0, pct3_7d: 0, pct7_15d: 0, pctOver15d: 0 };

  const pctUnder1d = (totalF1 / totalAll) * 100;
  const pct1_3d = (totalF2 / totalAll) * 100;
  const pct3_7d = (totalF3 / totalAll) * 100;
  const pct7_15d = (totalF4 / totalAll) * 100;
  const pctOver15d = (totalF5 / totalAll) * 100;

  const score =
    (pctUnder1d * config.grade_under_1d / 100) +
    (pct1_3d * config.grade_1_3d / 100) +
    (pct3_7d * config.grade_3_7d / 100) +
    (pct7_15d * config.grade_7_15d / 100) +
    (pctOver15d * config.grade_over_15d / 100);

  return { score: +score.toFixed(1), pctUnder1d, pct1_3d, pct3_7d, pct7_15d, pctOver15d };
}

/** Compute quality percentage from real data */
export function computeQualityPercentage(
  selectedName: string | null,
  groupBy: "empresa" | "unidade" | "area"
): number {
  type Row = { name: string; reg: number; just: number };
  let rows: Row[];
  if (groupBy === "unidade") {
    rows = qualidadeUnidadeData.map(r => ({ name: r.business_unit_name, reg: r.registradas, just: r.justificadas }));
  } else if (groupBy === "area") {
    rows = qualidadeAreaData.map(r => ({ name: r.area_name, reg: r.registradas, just: r.justificadas }));
  } else {
    rows = qualidadeEmpresaData.map(r => ({ name: r.company_name, reg: r.registradas, just: r.justificadas }));
  }
  const filtered = selectedName ? rows.filter(r => r.name === selectedName) : rows;
  let totalReg = 0, totalJust = 0;
  for (const r of filtered) { totalReg += r.reg; totalJust += r.just; }
  const total = totalReg + totalJust;
  return total > 0 ? +((totalReg / total) * 100).toFixed(1) : 0;
}

/** Compute composite score */
export function computeCompositeScore(
  selectedName: string | null,
  groupBy: "empresa" | "unidade" | "area",
  config: ScoreConfig
): number {
  const qualPct = computeQualityPercentage(selectedName, groupBy);
  const treat = computeTreatmentScore(selectedName, groupBy, config);
  return +((qualPct * config.weight_quality / 100) + (treat.score * config.weight_treatment / 100)).toFixed(1);
}

interface ScoreConfigContextType {
  config: ScoreConfig;
  setConfig: (config: ScoreConfig) => void;
  saveConfig: () => Promise<void>;
  resetToDefault: () => void;
  loading: boolean;
}

const ScoreConfigContext = createContext<ScoreConfigContextType>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
  saveConfig: async () => {},
  resetToDefault: () => {},
  loading: true,
});

export function useScoreConfig() {
  return useContext(ScoreConfigContext);
}

export function ScoreConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ScoreConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await (supabase as any).from("score_config").select("*").eq("config_key", "qualidade_ponto").single();
        if (data) {
          setConfig({
            weight_quality: data.weight_quality,
            weight_treatment: data.weight_treatment,
            grade_under_1d: data.grade_under_1d,
            grade_1_3d: data.grade_1_3d,
            grade_3_7d: data.grade_3_7d,
            grade_7_15d: data.grade_7_15d,
            grade_over_15d: data.grade_over_15d,
            threshold_excellent: data.threshold_excellent,
            threshold_good: data.threshold_good,
            threshold_warning: data.threshold_warning,
            threshold_poor: data.threshold_poor,
          });
        }
      } catch (e) {
        console.error("Failed to load score config:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveConfig = useCallback(async () => {
    try {
      await (supabase as any).from("score_config").update({
        ...config,
        updated_at: new Date().toISOString(),
      }).eq("config_key", "qualidade_ponto");
    } catch (e) {
      console.error("Failed to save score config:", e);
    }
  }, [config]);

  const resetToDefault = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <ScoreConfigContext.Provider value={{ config, setConfig, saveConfig, resetToDefault, loading }}>
      {children}
    </ScoreConfigContext.Provider>
  );
}
