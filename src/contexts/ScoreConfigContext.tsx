import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface ScoreConfig {
  weight_quality: number;
  weight_treatment: number;
  weight_backoffice: number;
  grade_under_1d: number;
  grade_1_3d: number;
  grade_3_7d: number;
  grade_7_15d: number;
  grade_over_15d: number;
  grade_bo_under_400: number;
  grade_bo_400_700: number;
  grade_bo_700_1000: number;
  grade_bo_1000_1400: number;
  grade_bo_over_1400: number;
  threshold_excellent: number;
  threshold_good: number;
  threshold_warning: number;
  threshold_poor: number;
}

export const DEFAULT_CONFIG: ScoreConfig = {
  weight_quality: 50,
  weight_treatment: 30,
  weight_backoffice: 20,
  grade_under_1d: 100,
  grade_1_3d: 75,
  grade_3_7d: 50,
  grade_7_15d: 20,
  grade_over_15d: 0,
  grade_bo_under_400: 100,
  grade_bo_400_700: 75,
  grade_bo_700_1000: 50,
  grade_bo_1000_1400: 25,
  grade_bo_over_1400: 0,
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

// Re-export computation functions from the dedicated module
export {
  computeQualityPercentage,
  computeTreatmentScore,
  computeBackofficeScore,
  computeCompositeScore,
  computeFullBreakdown,
  computePrevTriScore,
} from "@/lib/scoreComputations";

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
            weight_quality: data.weight_quality ?? DEFAULT_CONFIG.weight_quality,
            weight_treatment: data.weight_treatment ?? DEFAULT_CONFIG.weight_treatment,
            weight_backoffice: data.weight_backoffice ?? DEFAULT_CONFIG.weight_backoffice,
            grade_under_1d: data.grade_under_1d,
            grade_1_3d: data.grade_1_3d,
            grade_3_7d: data.grade_3_7d,
            grade_7_15d: data.grade_7_15d,
            grade_over_15d: data.grade_over_15d,
            grade_bo_under_400: data.grade_bo_under_400 ?? DEFAULT_CONFIG.grade_bo_under_400,
            grade_bo_400_700: data.grade_bo_400_700 ?? DEFAULT_CONFIG.grade_bo_400_700,
            grade_bo_700_1000: data.grade_bo_700_1000 ?? DEFAULT_CONFIG.grade_bo_700_1000,
            grade_bo_1000_1400: data.grade_bo_1000_1400 ?? DEFAULT_CONFIG.grade_bo_1000_1400,
            grade_bo_over_1400: data.grade_bo_over_1400 ?? DEFAULT_CONFIG.grade_bo_over_1400,
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
