/**
 * OperationMap components barrel export.
 * The OperationMap (scatter chart: Headcount × Score) is always the first chart below KPIRow.
 *
 * Currently implemented inline in each tab's Content component.
 * This barrel exists for future extraction when the chart is standardized across tabs.
 */
export { default as ScoreGauge } from "../ScoreGauge";
