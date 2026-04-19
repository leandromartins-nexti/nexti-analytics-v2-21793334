/**
 * Per-table row shapes for the Aurora gold schema — frontend copy.
 *
 * Mirrors nexti-analytics-api/src/lib/goldTables.types.ts. Keep them
 * in sync: any field renamed or added on the backend has to land here
 * or TypeScript will no longer catch contract drift.
 *
 * Future improvement: extract these to a shared package in the
 * eventual Connexti monorepo.
 */

export type DimType =
  | "COMPANY"
  | "BUSINESS_UNIT"
  | "AREA"
  | "CLIENT"
  | "OPERATION_DESK_FILTER";

export interface DimCore {
  readonly reference_month: string; // YYYY-MM-DD
  readonly dim_type: DimType;
  readonly dim_id: number;
  readonly dim_name: string;
}

export interface ClockingQualityMonthlyRow extends DimCore {
  readonly clocking_count: number;
  readonly registered_count: number;
  readonly justified_count: number;
  readonly quality_percentage: number; // 0..100
  readonly headcount: number;
  readonly active_headcount: number;
}

export interface ClockingTreatmentTimeMonthlyRow extends DimCore {
  readonly adjustments_count: number;
  readonly adj_up_to_1d_count: number;
  readonly adj_1_3d_count: number;
  readonly adj_3_7d_count: number;
  readonly adj_7_15d_count: number;
  readonly adj_over_15d_count: number;
  readonly resolution_avg_hours: number;
  readonly resolution_min_hours: number;
  readonly resolution_max_hours: number;
}

export interface ClockingBackofficeMonthlyRow extends DimCore {
  readonly adjustments_count: number;
  readonly active_operators_count: number;
  readonly adjustments_per_operator: number;
  readonly overtime_hours_allocated: number;
}

export interface AbsenceVolumeMonthlyRow extends DimCore {
  readonly absence_hours: number;
  readonly events_count: number;
  readonly distinct_people_count: number;
}

export interface AbsenceCompositionMonthlyRow extends DimCore {
  readonly absence_situation_id: number;
  readonly absence_situation_name: string;
  readonly absence_hours: number;
  readonly events_count: number;
  readonly distinct_people_count: number;
}

export type AbsenceMaturityCategory = "planned" | "reactive";

export interface AbsenceMaturityMonthlyRow extends DimCore {
  readonly category: AbsenceMaturityCategory;
  readonly absence_hours: number;
  readonly events_count: number;
  readonly distinct_people_count: number;
}

export type InsightSeverity =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "info"
  | "positive";

export type InsightType =
  | "risk"
  | "achievement"
  | "anomaly"
  | "trend"
  | "correlation"
  | "opportunity"
  | "event";

export type InsightActionStatus =
  | "pending"
  | "in_progress"
  | "done"
  | "cancelled";

export interface InsightActionStep {
  readonly step: number;
  readonly action: string;
  readonly status: InsightActionStatus;
  readonly notes: string | null;
  readonly deadline: string | null;
  readonly owner_label: string | null;
  readonly owner_user_id: number | null;
  readonly completed_at: string | null;
  readonly completed_by_user_id: number | null;
}

export interface InsightEvidenceCard {
  readonly icon: string | null;
  readonly label: string;
  readonly value: string;
  readonly subtext: string | null;
  readonly emphasis: "positive" | "negative" | null;
}

export interface AnalyticsInsightRow {
  readonly insight_id: string;
  readonly title: string;
  readonly description: string;
  readonly chart: string;
  readonly metric: string;
  readonly metric_key: string | null;
  readonly reference_month: string;
  readonly dim_type: DimType;
  readonly dim_id: number;
  readonly dim_name: string;
  readonly severity: InsightSeverity;
  readonly insight_type: InsightType;
  readonly evidence: unknown | null;
  readonly evidence_cards: readonly InsightEvidenceCard[];
  readonly action_plan: readonly InsightActionStep[];
  readonly related_insight_ids: readonly string[];
  readonly expires_at: string;
  readonly generated_at: string;
  readonly prompt_version: string;
  readonly model_version: string;
  readonly recommendation: string | null;
  readonly user_feedback: string | null;
  readonly feedback_at: string | null;
  readonly feedback_by: number | null;
}

export interface GoldTableRowMap {
  clocking_quality_monthly: ClockingQualityMonthlyRow;
  clocking_treatment_time_monthly: ClockingTreatmentTimeMonthlyRow;
  clocking_backoffice_monthly: ClockingBackofficeMonthlyRow;
  absence_volume_monthly: AbsenceVolumeMonthlyRow;
  absence_composition_monthly: AbsenceCompositionMonthlyRow;
  absence_maturity_monthly: AbsenceMaturityMonthlyRow;
}
