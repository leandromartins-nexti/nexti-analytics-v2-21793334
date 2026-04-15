/**
 * OperationFilter — re-exports GroupBySidebar as the standard operation filter.
 * GroupBySidebar already implements the sticky sidebar with empresa/unidade/area switching.
 *
 * This file exists to align with the analytics component naming convention.
 * Import from here or directly from GroupBySidebar — both work.
 */
export { default } from "../GroupBySidebar";
export type { GroupBy } from "../GroupBySidebar";
