import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Clock,
  MapPin,
  Megaphone,
  CheckSquare,
  ArrowLeftRight,
  Car,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const mainNavItems = [
    { label: "Dashboard", icon: BarChart3, path: "/" },
    { label: "Nexti Analytics", icon: BarChart3, path: "/analytics" },
    { label: "Prime", icon: null, path: "/prime", hasSubmenu: true },
    { label: "HaaS", icon: null, path: "/haas" },
    { label: "RH Digital", icon: null, path: "/rh-digital" },
    { label: "Plus", icon: null, path: "/plus" },
    { label: "Time", icon: null, path: "/time" },
    { label: "Control", icon: null, path: "/control" },
  ];

  const secondaryNavItems = [
    { label: "Mesa de Operações", icon: Clock, path: "/operations" },
    { label: "Mapa de Postos", icon: MapPin, path: "/map" },
  ];

  const expandableSections = [
    {
      id: "rh-digital-section",
      label: "RH Digital",
      icon: Megaphone,
      items: [
        { label: "Checklist", path: "/rh-digital/checklist" },
        { label: "Avisos", path: "/rh-digital/avisos" },
        { label: "Direct", path: "/rh-digital/direct" },
      ],
    },
    {
      id: "nexti-control",
      label: "Nexti Control",
      icon: Car,
      items: [],
    },
    {
      id: "nexti-control-2",
      label: "Nexti Control 2.0",
      icon: Car,
      badge: "Beta",
      items: [],
    },
    {
      id: "livro",
      label: "Livro de Ocorrência",
      icon: BookOpen,
      items: [],
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#3d4f5c] text-white transition-all duration-300 z-50 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="bg-[#ff5722] h-[100px] flex items-center justify-center relative">
        {!isCollapsed && (
          <div className="text-4xl font-bold italic text-white">nexti</div>
        )}
        {isCollapsed && (
          <div className="text-2xl font-bold text-white">N</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 text-white hover:bg-white/10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Main Navigation */}
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative",
                  "hover:bg-white/5",
                  isActive && "bg-[#2a3840]",
                  isCollapsed && "justify-center"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff5722]" />
                  )}
                  {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 mx-4 border-t border-white/10" />

        {/* Secondary Navigation */}
        <nav className="space-y-1 px-2">
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                  "hover:bg-white/5",
                  isActive && "bg-[#2a3840]",
                  isCollapsed && "justify-center"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 mx-4 border-t border-white/10" />

        {/* Expandable Sections */}
        <nav className="space-y-1 px-2">
          {!isCollapsed && (
            <>
              <button
                onClick={() => toggleSection("checklist")}
                className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-white/5 w-full"
              >
                <CheckSquare className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">
                  Checklist
                </span>
              </button>

              <button
                onClick={() => toggleSection("movimentacoes")}
                className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-white/5 w-full"
              >
                <ArrowLeftRight className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">
                  Movimentações em Lote
                </span>
              </button>
            </>
          )}

          {expandableSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => !isCollapsed && toggleSection(section.id)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-white/5 w-full"
              >
                <section.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">
                      {section.label}
                    </span>
                    {section.badge && (
                      <Badge className="bg-[#ff5722] hover:bg-[#ff5722] text-xs">
                        {section.badge}
                      </Badge>
                    )}
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </button>

              {!isCollapsed &&
                expandedSections.includes(section.id) &&
                section.items.length > 0 && (
                  <div className="ml-8 mt-1 space-y-1">
                    {section.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "block px-3 py-2 text-sm rounded-lg transition-colors",
                            "hover:bg-white/5",
                            isActive && "bg-[#2a3840] text-white"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};
