/**
 * Analytics Components — master barrel export.
 *
 * Usage:
 *   import { AnalyticsTab, KPIRow, InsightsSection, OperationFilter } from '@/components/analytics';
 */

// Tab wrapper
export { AnalyticsTab } from "./tab";

// KPI components
export { KPIRow, ScoreBoard, KPIBoard } from "./kpi";

// Filter / sidebar
export { OperationFilter } from "./filter";
export type { GroupBy } from "./filter";

// Chart utilities
export { ChartModeToggle, ChartDataModal, CompositeChartDataModal } from "./chart";

// Insights (always last in any tab)
export { InsightsSection, InsightDetailModal } from "./insights";

// Map
export { ScoreGauge } from "./map";

// Shared types
export type {
  BigNumberData,
  Score,
  ScoreLevel,
  OperationFilterState,
  ChartLocalFilter,
  Entity,
  TabContentProps,
} from "./types";

// Shared utilities
export { default as InfoTip } from "./InfoTip";
export { default as NoDataPlaceholder } from "./NoDataPlaceholder";
export { default as IndicatorTable } from "./IndicatorTable";
