import { useState } from "react";
import { Filter, ChevronDown, LogOut, Eraser } from "lucide-react";

const filterFields = [
  { key: "data", label: "Data", type: "date" as const, defaultValue: "01/01/2017" },
  { key: "empresa", label: "Empresa", type: "select" as const },
  { key: "unidadeNegocio", label: "Unidade de Negócio", type: "select" as const },
  { key: "area", label: "Área", type: "select" as const },
  { key: "filtroMesa", label: "Filtro de Mesa", type: "select" as const },
  { key: "cliente", label: "Cliente", type: "select" as const },
  { key: "posto", label: "Posto", type: "select" as const },
  { key: "servico", label: "Serviço", type: "select" as const },
];

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
}

export function FilterPanel({ open, onClose }: FilterPanelProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  if (!open) return null;

  const handleClear = () => setValues({});

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[300px] bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#FF5722]" />
            <span className="text-sm font-semibold text-gray-800">Selecione por:</span>
            <ChevronDown className="w-4 h-4 text-[#FF5722] ml-auto" />
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {filterFields.map((field) => (
            <div key={field.key}>
              <label className="text-xs font-semibold text-gray-800 mb-1 block">{field.label}</label>
              {field.type === "date" ? (
                <div className="relative">
                  <input
                    type="text"
                    value={values[field.key] || field.defaultValue || ""}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#FF5722]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📅</span>
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={values[field.key] || "Todos"}
                    onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white appearance-none focus:outline-none focus:border-[#FF5722]"
                  >
                    <option>Todos</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Eraser className="w-4 h-4" />
            Limpar
          </button>
        </div>
      </div>
    </>
  );
}
