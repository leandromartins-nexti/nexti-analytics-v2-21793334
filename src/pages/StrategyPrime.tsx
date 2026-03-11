import { useState } from "react";
import { ChevronRight, Filter, Settings, Eraser, Lightbulb, RefreshCw } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// Mock data
const qualidadeEvolucao = [
  { mes: "Jun", valor: 56 },
  { mes: "Jul", valor: 14 },
  { mes: "Ago", valor: 70 },
  { mes: "Set", valor: 88 },
  { mes: "Out", valor: 70 },
];

const topPiorQualidade = [
  { pos: 1, empresa: "Victória da Paz", pct: "0,3%" },
  { pos: 2, empresa: "PROFISER", pct: "1,7%" },
  { pos: 3, empresa: "Rio Oregon", pct: "6,8%" },
  { pos: 4, empresa: "ORSEGUPS MONITORAMENTO", pct: "39,2%" },
  { pos: 5, empresa: "ORSEGUPS SEGURANÇA", pct: "52,5%" },
  { pos: 6, empresa: "OBJETIVA", pct: "52,8%" },
  { pos: 7, empresa: "PROSERV", pct: "54,6%" },
];

const marcacoesPorTipo = [
  { tipo: "INVALID_TIME", pct: 100, cor: "#FF5722" },
  { tipo: "NOT_REGISTERED", pct: 100, cor: "#FF5722" },
];

const colaboradoresPorColetor = [
  { coletor: "SYSTEM", valor: 6749, cor: "#FF5722" },
  { coletor: "TERMINAL", valor: 6170, cor: "#FF5722" },
  { coletor: "MOBILE", valor: 115, cor: "#FF5722" },
];

const inconsistenciasReincidentes = [
  { colaborador: "ADM DE REDES", pct: 100 },
  { colaborador: "AGENTE DE ESTACIO...", pct: 100 },
  { colaborador: "AGENTE DE INSPECA...", pct: 100 },
  { colaborador: "AGENTE DE SEGURA...", pct: 100 },
  { colaborador: "ANALISTA DE INFRAE...", pct: 100 },
  { colaborador: "ANALISTA DE MARKE...", pct: 100 },
  { colaborador: "ANALISTA DE SISTEM...", pct: 100 },
  { colaborador: "ANALISTA DE SISTEM...", pct: 100 },
  { colaborador: "ANALISTA DE SISTEM...", pct: 100 },
];

const origemSolicitacoes = [
  { name: "% Total Ajustadas", value: 100, color: "#F5A623" },
  { name: "% Ajustes Origem Solicitações", value: 0, color: "#E8E8E8" },
];

const tabs = [
  "Registro de Ponto",
  "Operacional",
  "Coletor",
  "Engajamento e Retenção",
  "Ausências e Coberturas",
];

const subNavItems = ["Visão Geral", "Inconsistências", "Solicitações", "Eficiência"];

const filterOptions = ["Empresa", "Unidade de Negócio", "Cliente", "Posto", "Tipo de Serviço"];

const StrategyPrime = () => {
  const [activeTab, setActiveTab] = useState("Registro de Ponto");
  const [activeSubNav, setActiveSubNav] = useState("Visão Geral");
  const [activeFilter, setActiveFilter] = useState("Empresa");

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <header className="border-b border-gray-200 px-6 py-3 bg-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Home</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-gray-500">Strategy Analytics</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-[#FF5722] font-semibold">Prime</span>
        </div>
      </header>

      {/* Tabs Row */}
      <div className="border-b border-gray-200 bg-white px-6">
        <div className="flex items-center justify-between">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#FF5722] text-[#FF5722]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#FF5722] text-white px-5 py-2 rounded text-sm font-semibold">
              Operacional
            </button>
            <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Filtros Aplicados */}
      <div className="bg-white px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4 text-[#FF5722]" />
            <span className="font-semibold text-gray-700">Filtros Aplicados:</span>
          </div>
          <span className="bg-orange-50 text-[#FF5722] border border-[#FF5722] rounded-full px-3 py-1 text-xs font-medium">
            Período: jan/2017 - dez/2017
          </span>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-[#FF5722] hover:underline">
          <Eraser className="w-4 h-4" />
          Limpar Filtros
        </button>
      </div>

      {/* KPI Cards */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-5 gap-4">
          <KPICard
            title="Qualidade da Marcação"
            value="57,5%"
            valueColor="text-green-500"
            metaLabel="Taxa Qualidade"
            metaTarget="≥ 75%"
            yoyValue="57,5%"
            yoyColor="text-green-500"
            yoyIcon="↑"
          />
          <KPICard
            title="Inconsistência Tratada"
            value="-"
            valueColor="text-gray-400"
            metaLabel="Taxa Tratada"
            metaTarget="≥ 90%"
            yoyValue="-"
            yoyColor="text-gray-400"
          />
          <KPICard
            title="Tratativa Inconsistência"
            value="-"
            valueColor="text-gray-400"
            metaLabel="Tempo Médio"
            metaTarget="≤ 8h"
            yoyValue="-"
            yoyColor="text-gray-400"
          />
          <KPICard
            title="Solicitações Tratadas"
            value="99,3%"
            valueColor="text-green-500"
            metaLabel="Taxa Tratada"
            metaTarget="≥ 90%"
            yoyValue="0,0%"
            yoyColor="text-green-500"
            yoyIcon="↑"
          />
          <KPICard
            title="Tratativa de Solicitações"
            value="3357,5h"
            valueColor="text-red-500"
            metaLabel="Tempo Médio"
            metaTarget="≤ 8h"
            yoyValue="0,0%"
            yoyColor="text-green-500"
            yoyIcon="↑"
          />
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="px-6 pb-2">
        <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-3">
          <Settings className="w-4 h-4 text-[#FF5722]" />
          {subNavItems.map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <button
                onClick={() => setActiveSubNav(item)}
                className={`text-sm font-medium transition-colors ${
                  activeSubNav === item ? "text-[#FF5722]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item}
              </button>
              {index < subNavItems.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-6 pb-4 flex-1">
        {activeSubNav === "Visão Geral" && <VisaoGeralContent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
        {activeSubNav === "Inconsistências" && <InconsistenciasContent activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
        {activeSubNav === "Solicitações" && <PlaceholderContent title="Solicitações" />}
        {activeSubNav === "Eficiência" && <PlaceholderContent title="Eficiência" />}
              <RefreshCw className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Updated</p>
                <p className="text-xs text-gray-700 font-medium">Feb 25, 2026 às 17:07</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string;
  valueColor: string;
  metaLabel: string;
  metaTarget: string;
  yoyValue: string;
  yoyColor: string;
  yoyIcon?: string;
}

const KPICard = ({ title, value, valueColor, metaLabel, metaTarget, yoyValue, yoyColor, yoyIcon }: KPICardProps) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <p className="text-xs text-gray-500 font-medium mb-2 text-center">{title}</p>
    <p className={`text-3xl font-bold text-center mb-3 ${valueColor}`}>{value}</p>
    <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
      <div className="text-[10px] text-gray-400">
        <span>{metaLabel}</span>
      </div>
      <div className="text-[10px] text-gray-400">{metaTarget}</div>
    </div>
    <div className="flex items-center justify-between mt-1">
      <span className="text-[10px] text-gray-400">YoY</span>
      <span className={`text-[10px] font-medium ${yoyColor}`}>
        {yoyValue} {yoyIcon || ""}
      </span>
    </div>
  </div>
);

export default StrategyPrime;
