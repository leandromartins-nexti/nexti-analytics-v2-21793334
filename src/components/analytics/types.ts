/**
 * Shared types for Analytics tab components.
 * All analytics tabs reuse these interfaces for consistency.
 */

export type ScoreLevel = "excelente" | "bom" | "atencao" | "ruim" | "critico";

export interface Score {
  value: number; // 0-100
  classification: ScoreLevel;
}

export interface BigNumberData {
  label: string;
  value: string | number;
  unit?: string;
  classification?: {
    label: string;
    level: ScoreLevel;
  };
  trend?: {
    direction: "up" | "down" | "flat";
    value: string;
    label: string;
  };
  tooltip?: string;
  onClick?: () => void;
  /** Custom render for full control (e.g. ScoreBoard with gauge) */
  render?: React.ReactNode;
}

export interface OperationFilterState {
  empresas: string[];
  unidadesNegocio: string[];
  areas: string[];
  periodoInicio: string;
  periodoFim: string;
}

export interface ChartLocalFilter {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export interface Entity {
  id: string;
  name: string;
  headcount: number;
  score: Score;
}

/** Props shared by all Content components within tabs */
export interface TabContentProps {
  selectedRegional: string | null;
  onRegionalClick: (nome: string) => void;
  onItemDetail?: (nome: string) => void;
  groupBy: "empresa" | "unidade" | "area";
  onGroupByChange: (g: "empresa" | "unidade" | "area") => void;
}
