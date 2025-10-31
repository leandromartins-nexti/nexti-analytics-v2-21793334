import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Clock, 
  Map, 
  Megaphone, 
  CheckSquare, 
  ArrowRightLeft, 
  Car, 
  BookOpen,
  ChevronDown 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AppNavigation() {
  const [rhDigitalOpen, setRhDigitalOpen] = useState(false);
  const [nextiControlOpen, setNextiControlOpen] = useState(false);
  const [nextiControl2Open, setNextiControl2Open] = useState(false);
  const [livroOcorrenciaOpen, setLivroOcorrenciaOpen] = useState(false);

  return (
    <aside className="w-64 bg-slate-700 text-white flex flex-col min-h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="bg-orange-500 p-6 flex items-center justify-center">
        <span className="text-4xl font-bold italic text-white" style={{ fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }}>
          nexti
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Dashboards Section */}
        <div className="px-4 mb-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                isActive ? "bg-slate-600" : "hover:bg-slate-600"
              )
            }
          >
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-600 transition-colors mt-2"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Nexti Analytics</span>
          </NavLink>
        </div>

        {/* Main Menu */}
        <div className="space-y-1">
          <NavLink
            to="/prime/registro-ponto"
            className={({ isActive }) =>
              cn(
                "block px-8 py-3 transition-colors border-l-4",
                isActive 
                  ? "bg-slate-800 border-orange-500 text-white" 
                  : "border-transparent hover:bg-slate-600 text-slate-300"
              )
            }
          >
            Prime
          </NavLink>

          <NavLink
            to="/haas"
            className={({ isActive }) =>
              cn(
                "block px-8 py-3 transition-colors border-l-4",
                isActive 
                  ? "bg-slate-800 border-orange-500 text-white" 
                  : "border-transparent hover:bg-slate-600 text-slate-300"
              )
            }
          >
            HaaS
          </NavLink>

          <NavLink
            to="/rh-digital/direct"
            className={({ isActive }) =>
              cn(
                "block px-8 py-3 transition-colors border-l-4",
                isActive 
                  ? "bg-slate-800 border-orange-500 text-white" 
                  : "border-transparent hover:bg-slate-600 text-slate-300"
              )
            }
          >
            RH Digital
          </NavLink>

          <NavLink
            to="/plus"
            className={({ isActive }) =>
              cn(
                "block px-8 py-3 transition-colors border-l-4",
                isActive 
                  ? "bg-slate-800 border-orange-500 text-white" 
                  : "border-transparent hover:bg-slate-600 text-slate-300"
              )
            }
          >
            Plus
          </NavLink>

          <NavLink
            to="/time"
            className={({ isActive }) =>
              cn(
                "block px-8 py-3 transition-colors border-l-4",
                isActive 
                  ? "bg-slate-800 border-orange-500 text-white" 
                  : "border-transparent hover:bg-slate-600 text-slate-300"
              )
            }
          >
            Time
          </NavLink>

          <NavLink
            to="/control"
            className={({ isActive }) =>
              cn(
                "block px-8 py-3 transition-colors border-l-4",
                isActive 
                  ? "bg-slate-800 border-orange-500 text-white" 
                  : "border-transparent hover:bg-slate-600 text-slate-300"
              )
            }
          >
            Control
          </NavLink>
        </div>

        {/* Secondary Menu with Icons */}
        <div className="mt-6 space-y-1">
          <NavLink
            to="/operational"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-6 py-3 transition-colors",
                isActive ? "bg-slate-600" : "hover:bg-slate-600"
              )
            }
          >
            <Clock className="h-5 w-5" />
            <span>Mesa de Operações</span>
          </NavLink>

          <NavLink
            to="/maps"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-6 py-3 transition-colors",
                isActive ? "bg-slate-600" : "hover:bg-slate-600"
              )
            }
          >
            <Map className="h-5 w-5" />
            <span>Mapa de Postos</span>
          </NavLink>

          {/* RH Digital Expandable */}
          <div>
            <button
              onClick={() => setRhDigitalOpen(!rhDigitalOpen)}
              className="w-full flex items-center justify-between gap-3 px-6 py-3 hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Megaphone className="h-5 w-5" />
                <span>RH Digital</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  rhDigitalOpen && "rotate-180"
                )}
              />
            </button>
            {rhDigitalOpen && (
              <div className="ml-14 space-y-1">
                <NavLink
                  to="/rh-digital/checklist"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-2 transition-colors",
                      isActive ? "bg-slate-600" : "hover:bg-slate-600"
                    )
                  }
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>Checklist</span>
                </NavLink>
                <NavLink
                  to="/movimentacoes"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-2 transition-colors",
                      isActive ? "bg-slate-600" : "hover:bg-slate-600"
                    )
                  }
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span>Movimentações em Lote</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Nexti Control Expandable */}
          <div>
            <button
              onClick={() => setNextiControlOpen(!nextiControlOpen)}
              className="w-full flex items-center justify-between gap-3 px-6 py-3 hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5" />
                <span>Nexti Control</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  nextiControlOpen && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Nexti Control 2.0 Beta Expandable */}
          <div>
            <button
              onClick={() => setNextiControl2Open(!nextiControl2Open)}
              className="w-full flex items-center justify-between gap-3 px-6 py-3 hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5" />
                <span className="flex items-center gap-2">
                  Nexti Control 2.0
                  <span className="text-xs bg-orange-500 px-2 py-0.5 rounded">Beta</span>
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  nextiControl2Open && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Livro de Ocorrência Expandable */}
          <div>
            <button
              onClick={() => setLivroOcorrenciaOpen(!livroOcorrenciaOpen)}
              className="w-full flex items-center justify-between gap-3 px-6 py-3 hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                <span>Livro de Ocorrência</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  livroOcorrenciaOpen && "rotate-180"
                )}
              />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
