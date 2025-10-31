import { Home, Clock, Search } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
export function DashboardSidebar() {
  const {
    state
  } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const isHaasPage = location.pathname.startsWith("/haas");
  return <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        {!isCollapsed && <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nexti Analytics
          </h1>}
        {isCollapsed && <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            N
          </div>}
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        {!isCollapsed && <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-sidebar-accent/50 rounded-md transition-colors flex items-center justify-between">
                  Dashboards Gerenciais
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <Collapsible defaultOpen className="group/prime">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between">
                            <span>Prime</span>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/prime:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenu className="ml-4 mt-1">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/prime/registro-ponto" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Registro de Ponto</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/prime/operacional" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Operacional</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/prime/dispositivos" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Coletor</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/prime/engajamento" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Engajamento e Retenção</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/prime/ausencias-coberturas" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Ausências e Coberturas</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/haas" end className={({
                      isActive
                    }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                          <span>Haas</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <Collapsible defaultOpen className="group/rh-digital">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between">
                            <span>RH Digital</span>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/rh-digital:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenu className="ml-4 mt-1">
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/rh-digital/direct" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Direct</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/rh-digital/avisos" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Avisos e Convocações</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton asChild>
                                <NavLink to="/rh-digital/checklist" className={({
                              isActive
                            }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                                  <span>Check-list</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </SidebarMenu>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/plus" className={({
                      isActive
                    }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                          <span>Plus</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/time" className={({
                      isActive
                    }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                          <span>Time</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/control" className={({
                      isActive
                    }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                          <span>Control</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>}
        {isCollapsed && <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/" end className={({
                  isActive
                }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                      <Home className="h-4 w-4" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/registro-ponto" className={({
                  isActive
                }) => cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}>
                      <Clock className="h-4 w-4" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>}

        {!isCollapsed && <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-sidebar-accent/50 rounded-md transition-colors flex items-center justify-between">
                  Filtros
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <div className="space-y-3 px-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Cargo" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Posto" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Cliente" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Área" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Unidade de negócio" className="pl-9" />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Centro de Custo" className="pl-9" />
                    </div>
                    {isHaasPage && (
                      <>
                        <div className="pt-2">
                          <Label className="text-xs text-muted-foreground mb-1.5">Versão do Smart</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a versão" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              <SelectItem value="all">Todas as versões</SelectItem>
                              <SelectItem value="smart-v1">Smart v1.0</SelectItem>
                              <SelectItem value="smart-v2">Smart v2.0</SelectItem>
                              <SelectItem value="smart-v3">Smart v3.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-1.5">Versão do Terminal</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a versão" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover z-50">
                              <SelectItem value="all">Todas as versões</SelectItem>
                              <SelectItem value="terminal-v1">Terminal v1.0</SelectItem>
                              <SelectItem value="terminal-v2">Terminal v2.0</SelectItem>
                              <SelectItem value="terminal-v3">Terminal v3.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="IMEI" className="pl-9" />
                        </div>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="MAC" className="pl-9" />
                        </div>
                      </>
                    )}
                  </div>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>}

        {!isCollapsed && <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-sidebar-accent/50 rounded-md transition-colors flex items-center justify-between">
                  Período
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <div className="space-y-3 px-2">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5">Data Início *</Label>
                      <Input type="date" defaultValue="2024-01-01" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5">Data Fim *</Label>
                      <Input type="date" defaultValue="2024-12-31" />
                    </div>
                  </div>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!isCollapsed && <Button className="w-full" variant="default">
            Exportar Dados
          </Button>}
      </SidebarFooter>
    </Sidebar>;
}