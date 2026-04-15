/**
 * AnalyticsTab — standard wrapper for any Analytics tab.
 * Provides the shared layout: content area (scrollable) + sticky filter sidebar.
 *
 * Usage:
 *   <AnalyticsTab>
 *     <KPIRow bigNumbers={...} />
 *     <OperationMap ... />
 *     <ScoredChart ... />
 *     <InsightsSection ... />
 *   </AnalyticsTab>
 */
import { ReactNode } from "react";

interface AnalyticsTabProps {
  children: ReactNode;
  /** Optional sidebar (GroupBySidebar). If provided, renders the flex layout with sidebar. */
  sidebar?: ReactNode;
}

export default function AnalyticsTab({ children, sidebar }: AnalyticsTabProps) {
  return (
    <div className="flex">
      <div className="flex-1 min-w-0 space-y-3 pl-6 pr-4 py-4 overflow-y-auto">
        {children}
      </div>
      {sidebar}
    </div>
  );
}
