/**
 * Active customer configuration.
 *
 * During the pilot phase only Vig Eyes (customer_id 642) is served.
 * When the backend is wired (see nexti-analytics-api), this constant
 * gets replaced by a value derived from the authenticated user's JWT
 * claims — consumers should not need to change.
 */

export type DimType =
  | "COMPANY"
  | "BUSINESS_UNIT"
  | "AREA"
  | "CLIENT"
  | "OPERATION_DESK_FILTER";

export interface CustomerConfig {
  readonly customer_id: number;
  readonly slug: string;
  readonly name: string;
  readonly primary_dim_type: DimType;
  readonly available_dim_types: readonly DimType[];
}

export const CURRENT_CUSTOMER: CustomerConfig = {
  customer_id: 642,
  slug: "vigeyes",
  name: "Vig Eyes",
  primary_dim_type: "BUSINESS_UNIT",
  available_dim_types: ["COMPANY", "BUSINESS_UNIT", "AREA"],
};
