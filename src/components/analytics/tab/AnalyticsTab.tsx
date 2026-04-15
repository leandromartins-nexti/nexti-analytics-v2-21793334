/**
 * AnalyticsTab — standard wrapper for any Analytics tab.
 * Provides the shared layout: content area (scrollable) + sticky filter sidebar.
 *
 * Responsive behavior:
 * - Desktop (≥1280px): content + sticky sidebar side by side
 * - Tablet (768-1279px): content full width + sidebar as drawer (right slide)
 * - Mobile (<768px): content full width + sidebar as fullscreen drawer
 */
import { ReactNode, useState } from "react";
import { Filter, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface AnalyticsTabProps {
  children: ReactNode;
  /** Optional sidebar (GroupBySidebar). If provided, renders the flex layout with sidebar on desktop, drawer on tablet/mobile. */
  sidebar?: ReactNode;
}

export default function AnalyticsTab({ children, sidebar }: AnalyticsTabProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex w-full">
      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-3 pl-6 pr-4 py-4 overflow-y-auto">
        {children}
      </div>

      {/* Desktop: inline sidebar */}
      {sidebar && (
        <div className="hidden xl:block">
          {sidebar}
        </div>
      )}

      {/* Tablet/Mobile: floating button + drawer */}
      {sidebar && (
        <>
          <button
            onClick={() => setDrawerOpen(true)}
            className="xl:hidden fixed bottom-6 right-6 z-40 bg-[#FF5722] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#E64A19] transition-colors"
            aria-label="Abrir filtro"
          >
            <Filter className="w-5 h-5" />
          </button>

          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetContent
              side="right"
              className="w-[360px] max-md:w-full p-0 overflow-y-auto"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Filtro de Operações</SheetTitle>
              </SheetHeader>
              {sidebar}
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
