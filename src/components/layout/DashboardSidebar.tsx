import {
  BarChart3, LayoutDashboard, ClipboardList, CheckCircle, Shield, Scale, Building2,
  DollarSign, TrendingUp, PiggyBank, GitCompare, Wallet,
  Target, LineChart, ListChecks, SlidersHorizontal,
  Gavel, FileWarning, Bell, BookOpen,
  Brain, BarChart2, MessageCircle,
  Settings, ChevronDown, Lock,
  Car, Clock, Map, Megaphone, CheckSquare, ArrowLeftRight,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import nextiLogo from "@/assets/nexti-logo.png";
import nextiLogoSmall from "@/assets/nexti-logo-small.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarToggleButton } from "./SidebarToggleButton";

// ─── Analytics menu structure ───────────────────────────────────

interface MenuItem {
  label: string;
  icon: React.ElementType;
  route?: string;
  locked?: boolean;
}

interface MenuGroup {
  label: string;
  icon: React.ElementType;
  locked?: boolean;
  defaultOpen?: boolean;
  children: MenuItem[];
}

const analyticsGroups: MenuGroup[] = [
  {
    label: "Operacional",
    icon: ClipboardList,
    defaultOpen: true,
    children: [
      { label: "Disciplina Operacional", icon: CheckCircle, route: "/analytics/disciplina-operacional" },
      { label: "Coberturas e Continuidade", icon: Shield, route: "/analytics/coberturas-continuidade" },
      { label: "Violações Trabalhistas", icon: Scale, route: "/analytics/violacoes-trabalhistas" },
      { label: "Operações e Estruturas", icon: Building2, route: "/analytics/operacoes-estruturas" },
    ],
  },
  {
    label: "Financeiro",
    icon: DollarSign,
    locked: true,
    children: [
      { label: "Alavancas de Economia", icon: TrendingUp, route: "/analytics/locked/alavancas", locked: true },
      { label: "Retorno do Investimento", icon: PiggyBank, route: "/analytics/locked/roi", locked: true },
      { label: "Previsto vs Realizado", icon: GitCompare, route: "/analytics/locked/previsto-realizado", locked: true },
      { label: "Rentabilidade", icon: Wallet, route: "/analytics/locked/rentabilidade", locked: true },
    ],
  },
  {
    label: "Estratégico",
    icon: Target,
    locked: true,
    children: [
      { label: "Evolução da Operação", icon: LineChart, route: "/analytics/locked/evolucao", locked: true },
      { label: "Plano de Ação", icon: ListChecks, route: "/analytics/locked/plano-acao", locked: true },
      { label: "Simulador de Cenários", icon: SlidersHorizontal, route: "/analytics/locked/simulador", locked: true },
    ],
  },
  {
    label: "Compliance Avançado",
    icon: Gavel,
    locked: true,
    children: [
      { label: "Sanções Disciplinares", icon: FileWarning, route: "/analytics/locked/sancoes", locked: true },
      { label: "Alertas Preventivos", icon: Bell, route: "/analytics/locked/alertas-preventivos", locked: true },
      { label: "Regulatório", icon: BookOpen, route: "/analytics/locked/regulatorio", locked: true },
    ],
  },
  {
    label: "Inteligência",
    icon: Brain,
    locked: true,
    children: [
      { label: "Previsões", icon: TrendingUp, route: "/analytics/locked/previsoes", locked: true },
      { label: "Benchmark Setorial", icon: BarChart2, route: "/analytics/locked/benchmark", locked: true },
      { label: "Chatbot Analítico", icon: MessageCircle, route: "/analytics/locked/chatbot", locked: true },
    ],
  },
];

// ─── Collapsible Group Component ────────────────────────────────

function SidebarCollapsibleGroup({
  group,
  isCollapsed,
  location,
}: {
  group: MenuGroup;
  isCollapsed: boolean;
  location: ReturnType<typeof useLocation>;
}) {
  const isChildActive = group.children.some((c) => c.route && location.pathname === c.route);
  const [open, setOpen] = useState(group.defaultOpen || isChildActive);

  if (isCollapsed) {
    return (
      <SidebarGroup className="px-3 py-0.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3 justify-center">
              <group.icon className="w-5 h-5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="px-3">
      <CollapsibleTrigger className="w-full">
        <SidebarMenuButton className="text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3 w-full justify-between">
          <div className="flex items-center">
            <group.icon className="w-5 h-5 mr-3" />
            <span className="font-normal text-[15px]">{group.label}</span>
            {group.locked && <Lock className="w-3 h-3 ml-1.5 text-[#A1A3A4]" />}
          </div>
          <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenu className="mt-0.5">
          {group.children.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "text-[#A1A3A4] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors pl-11 h-9 font-normal text-[14px]",
                  item.route && location.pathname === item.route && "text-white bg-[rgba(255,255,255,0.08)]"
                )}
              >
                <NavLink to={item.route || "#"}>
                  <item.icon className="w-4 h-4 mr-2 text-[#A1A3A4]" />
                  <span className="flex-1">{item.label}</span>
                  {item.locked && <Lock className="w-3 h-3 ml-auto text-[#A1A3A4]" />}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ─── Legacy menu items (non-Analytics) ──────────────────────────

function LegacyMenuItems({ isCollapsed }: { isCollapsed: boolean }) {
  const [rhDigitalOpen, setRhDigitalOpen] = useState(false);
  const [nextiControlOpen, setNextiControlOpen] = useState(false);
  const [nextiControl2Open, setNextiControl2Open] = useState(false);
  const [livroOpen, setLivroOpen] = useState(false);

  const collapsibleSection = (
    label: string,
    Icon: React.ElementType,
    open: boolean,
    setOpen: (v: boolean) => void,
    badge?: string,
    children?: React.ReactNode
  ) => {
    if (isCollapsed) {
      return (
        <SidebarGroup className="px-3 py-0.5">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3 justify-center">
                <Icon className="w-5 h-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      );
    }

    return (
      <Collapsible open={open} onOpenChange={setOpen} className="px-3">
        <CollapsibleTrigger className="w-full">
          <SidebarMenuButton className="text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3 w-full justify-between">
            <div className="flex items-center">
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-normal text-[15px]">{label}</span>
              {badge && <span className="ml-2 px-2 py-0.5 bg-[#FF5722] text-white text-xs rounded font-medium">{badge}</span>}
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="mt-1">{children}</SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <>
      {/* Mesa de Operações */}
      <SidebarGroup className="px-3 py-0.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className={cn("text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3", isCollapsed && "justify-center")}>
              <Clock className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span className="font-normal text-[15px]">Mesa de Operações</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {/* Mapa de Postos */}
      <SidebarGroup className="px-3 py-0.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className={cn("text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3", isCollapsed && "justify-center")}>
              <Map className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span className="font-normal text-[15px]">Mapa de Postos</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {/* RH Digital */}
      {collapsibleSection("RH Digital", Megaphone, rhDigitalOpen, setRhDigitalOpen, undefined,
        <>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#A1A3A4] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors pl-11 h-10 font-normal text-[15px]">
              <CheckSquare className="w-4 h-4 mr-2 text-[#A1A3A4]" />
              <span>Checklist</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#A1A3A4] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors pl-11 h-10 font-normal text-[15px]">
              <ArrowLeftRight className="w-4 h-4 mr-2 text-[#A1A3A4]" />
              <span>Movimentações em Lote</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}

      {/* Nexti Control */}
      {collapsibleSection("Nexti Control", Car, nextiControlOpen, setNextiControlOpen)}

      {/* Nexti Control 2.0 */}
      {collapsibleSection("Nexti Control 2.0", Car, nextiControl2Open, setNextiControl2Open, "Beta")}

      {/* Livro de Ocorrência */}
      {collapsibleSection("Livro de Ocorrência", BookOpen, livroOpen, setLivroOpen)}
    </>
  );
}

// ─── Main Sidebar ───────────────────────────────────────────────

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar
      className={cn(isCollapsed ? "w-16" : "w-64", "bg-[#3d4449] border-r border-[rgba(255,255,255,0.05)]")}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-[rgba(255,255,255,0.05)] bg-[#FF5722] flex flex-row items-center justify-between">
        {!isCollapsed && (
          <div className="text-white">
            <img src={nextiLogo} alt="Nexti" className="h-10" />
          </div>
        )}
        {isCollapsed && (
          <div className="text-white flex items-center justify-center w-full">
            <img src={nextiLogoSmall} alt="N" className="h-12 w-auto object-contain" />
          </div>
        )}
        <SidebarToggleButton className="text-white hover:bg-[rgba(255,255,255,0.1)] h-8 w-8 p-0 ml-auto" />
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto bg-[#3d4449] [&>*+*]:mt-0">
        {/* ── Analytics Section ── */}

        {/* Analytics header */}
        <SidebarGroup className="px-3 py-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn("text-white hover:bg-[rgba(255,255,255,0.05)] h-10 px-3", isCollapsed && "justify-center")}
              >
                <NavLink to="/analytics">
                  <BarChart3 className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span className="font-semibold text-[15px]">Analytics</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Resumo Executivo */}
        <SidebarGroup className="px-3 py-0.5">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn(
                  "text-[#A1A3A4] hover:text-white hover:bg-[rgba(255,255,255,0.05)] h-9 px-3",
                  isCollapsed ? "justify-center" : "pl-8",
                  location.pathname === "/analytics" && "text-white bg-[rgba(255,255,255,0.08)]"
                )}
              >
                <NavLink to="/analytics">
                  <LayoutDashboard className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span className="font-normal text-[14px]">Resumo Executivo</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Collapsible groups */}
        {analyticsGroups.map((group) => (
          <SidebarCollapsibleGroup key={group.label} group={group} isCollapsed={isCollapsed} location={location} />
        ))}

        {/* Configuração */}
        <SidebarGroup className="px-3 py-0.5">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn(
                  "text-[#A1A3A4] hover:text-white hover:bg-[rgba(255,255,255,0.05)] h-9 px-3",
                  isCollapsed ? "justify-center" : "pl-8",
                  location.pathname === "/analytics/configuracao" && "text-white bg-[rgba(255,255,255,0.08)]"
                )}
              >
                <NavLink to="/analytics/configuracao">
                  <Settings className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span className="font-normal text-[14px]">Configuração</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* ── Divider ── */}
        <div className="mx-3 my-2 border-t border-[rgba(255,255,255,0.1)]" />

        {/* ── Legacy items ── */}
        <LegacyMenuItems isCollapsed={isCollapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
