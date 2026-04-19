/**
 * Static dataset hook for the "Qualidade do Ponto" tab.
 *
 * Loads the Vig Eyes (customer 642) gold data from the bundled customer
 * folder. Kept as a hook (rather than direct imports) so the future
 * adapter pattern can swap the source to the API without changing any
 * consumer.
 */
import hcEmpresa from "@/data/customers/642/qualidade-ponto/headcount-por-empresa.json";
import hcUnidade from "@/data/customers/642/qualidade-ponto/headcount-por-un-negocio.json";
import hcArea from "@/data/customers/642/qualidade-ponto/headcount-por-area.json";
import tratTempoEmpresa from "@/data/customers/642/qualidade-ponto/tratativa-tempo-por-empresa.json";
import tratTempoUnidade from "@/data/customers/642/qualidade-ponto/tratativa-tempo-por-un-negocio.json";
import tratTempoArea from "@/data/customers/642/qualidade-ponto/tratativa-tempo-por-area.json";
import sobrecargaEmpresa from "@/data/customers/642/qualidade-ponto/sobrecarga-por-empresa.json";
import sobrecargaUnidade from "@/data/customers/642/qualidade-ponto/sobrecarga-por-un-negocio.json";
import sobrecargaArea from "@/data/customers/642/qualidade-ponto/sobrecarga-por-area.json";
import decomposicaoScore from "@/data/customers/642/qualidade-ponto/decomposicao-score.json";
import kpisPeriodoAnterior from "@/data/customers/642/qualidade-ponto/kpis-periodo-anterior.json";

export interface QualidadePontoDatasets {
  hcEmpresa: any[];
  hcUnidade: any[];
  hcArea: any[];
  tratTempoEmpresa: any[];
  tratTempoUnidade: any[];
  tratTempoArea: any[];
  sobrecargaEmpresa: any[];
  sobrecargaUnidade: any[];
  sobrecargaArea: any[];
  decomposicaoScore: any;
  kpisPeriodoAnterior: any;
}

const DATASETS: QualidadePontoDatasets = {
  hcEmpresa: hcEmpresa as any[],
  hcUnidade: hcUnidade as any[],
  hcArea: hcArea as any[],
  tratTempoEmpresa: tratTempoEmpresa as any[],
  tratTempoUnidade: tratTempoUnidade as any[],
  tratTempoArea: tratTempoArea as any[],
  sobrecargaEmpresa: sobrecargaEmpresa as any[],
  sobrecargaUnidade: sobrecargaUnidade as any[],
  sobrecargaArea: sobrecargaArea as any[],
  decomposicaoScore,
  kpisPeriodoAnterior,
};

export function useQualidadePontoData(): {
  data: QualidadePontoDatasets;
  loading: boolean;
} {
  return { data: DATASETS, loading: false };
}
