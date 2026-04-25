/**
 * Dados da aba Férias V2.
 *
 * Conforme spec:
 * - BIG_NUMBERS, COMPOSICAO_COBERTURA, PLANEJAMENTO, PONTO_BATIDO, MAPA_OPERACOES → REAL (Orsegups)
 * - CASOS_RISCO, HEATMAP_POSTOS, CUSTO_COBERTURA, TENDENCIA_SCORE,
 *   COMPARATIVO_UNIDADES, HALL_GLORIA_VERGONHA → MOCK (estimativas plausíveis)
 *
 * Substituir os mocks por dados reais quando queries específicas estiverem disponíveis.
 */

export const BIG_NUMBERS = {
  periodo: {
    inicio: "2025-04-01",
    fim: "2026-04-01",
    label: "Últimos 12 meses",
  },
  score_ferias: {
    valor: 58,
    label_severidade: "atencao",
    delta_pp_vs_anterior: -8,
    comentario: "3 alertas: planejamento, ponto batido, cobertura informal",
  },
  volume_total_ferias: {
    valor: 5551,
    label_severidade: "neutro",
    comentario: "férias iniciadas no período",
  },
  horas_cobertura_he_pct: {
    valor: 2.49,
    unidade: "%",
    label_severidade: "bom",
    comentario: "HE é minoritária na cobertura",
  },
  antecedencia_media_dias: {
    valor: 14.9,
    unidade: "dias",
    label_severidade: "critico",
    comentario: "Planejamento de última hora",
  },
  ferias_com_ponto_batido_pct: {
    valor: 98.8,
    unidade: "%",
    label_severidade: "critico",
    comentario: "Escala não é desativada em férias",
  },
  ferias_sem_cobertura_pct: {
    valor: 29.0,
    unidade: "%",
    label_severidade: "atencao",
    comentario: "Posto descoberto ou cobertura informal",
  },
};

export const ALERTAS = [
  { titulo: "Planejamento crítico", descricao: "Antecedência média de 14,9 dias — abaixo do ideal de 30 dias", severidade: "critico" },
  { titulo: "Ponto batido sistêmico", descricao: "98,8% das férias têm ponto batido — escala não é desativada", severidade: "critico" },
  { titulo: "Cobertura informal", descricao: "29% das férias sem cobertura formal cadastrada", severidade: "atencao" },
];

// ════════════════════════════════════════════════════════════
// 1. Composição da Cobertura (REAL)
// ════════════════════════════════════════════════════════════
export const COMPOSICAO_COBERTURA = {
  totais_periodo: {
    horas_cobertura_total: 550041.5,
    ferista_dedicado_h_total: 238481.5,
    remanejo_h_total: 297878.8,
    overtime_h_total: 13683.2,
    pct_he_periodo: 2.49,
    ferias_total: 5551,
    ferias_sem_cobertura_total: 1611,
    pct_sem_cobertura_periodo: 29.0,
  },
  serie_mensal: [
    { mes: "2025-04-01", ferista_dedicado_h: 14489.2, remanejo_h: 21318.7, overtime_h: 917.3, pct_he_sobre_cobertura: 2.50, qtd_feristas_dedicados: 97, qtd_remanejadores: 174, ferias_sem_cobertura_qtd: 144, ferias_total_mes: 433 },
    { mes: "2025-05-01", ferista_dedicado_h: 16779.9, remanejo_h: 23316.5, overtime_h: 1273.2, pct_he_sobre_cobertura: 3.08, qtd_feristas_dedicados: 105, qtd_remanejadores: 181, ferias_sem_cobertura_qtd: 130, ferias_total_mes: 433 },
    { mes: "2025-06-01", ferista_dedicado_h: 18637.0, remanejo_h: 24725.8, overtime_h: 1200.1, pct_he_sobre_cobertura: 2.69, qtd_feristas_dedicados: 123, qtd_remanejadores: 182, ferias_sem_cobertura_qtd: 133, ferias_total_mes: 442 },
    { mes: "2025-07-01", ferista_dedicado_h: 23772.3, remanejo_h: 27084.7, overtime_h: 1340.9, pct_he_sobre_cobertura: 2.57, qtd_feristas_dedicados: 147, qtd_remanejadores: 208, ferias_sem_cobertura_qtd: 169, ferias_total_mes: 542 },
    { mes: "2025-08-01", ferista_dedicado_h: 22962.7, remanejo_h: 24181.9, overtime_h: 862.0, pct_he_sobre_cobertura: 1.80, qtd_feristas_dedicados: 155, qtd_remanejadores: 184, ferias_sem_cobertura_qtd: 150, ferias_total_mes: 491 },
    { mes: "2025-09-01", ferista_dedicado_h: 22514.5, remanejo_h: 20958.2, overtime_h: 1040.9, pct_he_sobre_cobertura: 2.34, qtd_feristas_dedicados: 155, qtd_remanejadores: 152, ferias_sem_cobertura_qtd: 119, ferias_total_mes: 442 },
    { mes: "2025-10-01", ferista_dedicado_h: 25802.4, remanejo_h: 25201.5, overtime_h: 892.7, pct_he_sobre_cobertura: 1.72, qtd_feristas_dedicados: 160, qtd_remanejadores: 196, ferias_sem_cobertura_qtd: 120, ferias_total_mes: 493 },
    { mes: "2025-11-01", ferista_dedicado_h: 23127.6, remanejo_h: 21550.7, overtime_h: 1231.8, pct_he_sobre_cobertura: 2.68, qtd_feristas_dedicados: 149, qtd_remanejadores: 180, ferias_sem_cobertura_qtd: 83, ferias_total_mes: 407 },
    { mes: "2025-12-01", ferista_dedicado_h: 19902.2, remanejo_h: 21450.5, overtime_h: 932.8, pct_he_sobre_cobertura: 2.21, qtd_feristas_dedicados: 130, qtd_remanejadores: 179, ferias_sem_cobertura_qtd: 220, ferias_total_mes: 533 },
    { mes: "2026-01-01", ferista_dedicado_h: 19433.6, remanejo_h: 27099.8, overtime_h: 1182.6, pct_he_sobre_cobertura: 2.48, qtd_feristas_dedicados: 132, qtd_remanejadores: 209, ferias_sem_cobertura_qtd: 155, ferias_total_mes: 476 },
    { mes: "2026-02-01", ferista_dedicado_h: 14289.0, remanejo_h: 23628.6, overtime_h: 1147.5, pct_he_sobre_cobertura: 2.94, qtd_feristas_dedicados: 105, qtd_remanejadores: 190, ferias_sem_cobertura_qtd: 84, ferias_total_mes: 359 },
    { mes: "2026-03-01", ferista_dedicado_h: 16768.1, remanejo_h: 37362.9, overtime_h: 1661.4, pct_he_sobre_cobertura: 2.98, qtd_feristas_dedicados: 111, qtd_remanejadores: 294, ferias_sem_cobertura_qtd: 104, ferias_total_mes: 500 },
  ],
};

// ════════════════════════════════════════════════════════════
// 2. Disciplina de Planejamento (REAL)
// ════════════════════════════════════════════════════════════
export const PLANEJAMENTO = {
  totais_periodo: {
    ferias_total: 5551,
    antecipada_mais_30d_total: 550,
    razoavel_16_30d_total: 1593,
    apertada_8_15d_total: 1442,
    ultima_hora_0_7d_total: 1933,
    pct_ultima_hora_periodo: 35.0,
    antecedencia_media_dias_periodo: 14.9,
  },
  serie_mensal: [
    { mes: "2025-04-01", antecipada_mais_30d: 43, razoavel_16_30d: 137, apertada_8_15d: 112, ultima_hora_0_7d: 137, total_ferias: 433, pct_ultima_hora: 31.6, antecedencia_media_dias: 15.4 },
    { mes: "2025-05-01", antecipada_mais_30d: 40, razoavel_16_30d: 103, apertada_8_15d: 87, ultima_hora_0_7d: 200, total_ferias: 433, pct_ultima_hora: 46.2, antecedencia_media_dias: 13.4 },
    { mes: "2025-06-01", antecipada_mais_30d: 19, razoavel_16_30d: 69, apertada_8_15d: 120, ultima_hora_0_7d: 228, total_ferias: 442, pct_ultima_hora: 51.6, antecedencia_media_dias: 10.6 },
    { mes: "2025-07-01", antecipada_mais_30d: 39, razoavel_16_30d: 155, apertada_8_15d: 131, ultima_hora_0_7d: 215, total_ferias: 542, pct_ultima_hora: 39.7, antecedencia_media_dias: 14.2 },
    { mes: "2025-08-01", antecipada_mais_30d: 61, razoavel_16_30d: 120, apertada_8_15d: 122, ultima_hora_0_7d: 186, total_ferias: 491, pct_ultima_hora: 37.9, antecedencia_media_dias: 15.1 },
    { mes: "2025-09-01", antecipada_mais_30d: 43, razoavel_16_30d: 136, apertada_8_15d: 127, ultima_hora_0_7d: 135, total_ferias: 442, pct_ultima_hora: 30.5, antecedencia_media_dias: 15.0 },
    { mes: "2025-10-01", antecipada_mais_30d: 43, razoavel_16_30d: 119, apertada_8_15d: 131, ultima_hora_0_7d: 196, total_ferias: 493, pct_ultima_hora: 39.8, antecedencia_media_dias: 13.9 },
    { mes: "2025-11-01", antecipada_mais_30d: 39, razoavel_16_30d: 121, apertada_8_15d: 132, ultima_hora_0_7d: 113, total_ferias: 407, pct_ultima_hora: 27.8, antecedencia_media_dias: 15.5 },
    { mes: "2025-12-01", antecipada_mais_30d: 55, razoavel_16_30d: 177, apertada_8_15d: 130, ultima_hora_0_7d: 168, total_ferias: 533, pct_ultima_hora: 31.5, antecedencia_media_dias: 15.5 },
    { mes: "2026-01-01", antecipada_mais_30d: 73, razoavel_16_30d: 159, apertada_8_15d: 113, ultima_hora_0_7d: 128, total_ferias: 476, pct_ultima_hora: 26.9, antecedencia_media_dias: 17.0 },
    { mes: "2026-02-01", antecipada_mais_30d: 38, razoavel_16_30d: 130, apertada_8_15d: 100, ultima_hora_0_7d: 89, total_ferias: 359, pct_ultima_hora: 24.8, antecedencia_media_dias: 16.4 },
    { mes: "2026-03-01", antecipada_mais_30d: 57, razoavel_16_30d: 167, apertada_8_15d: 137, ultima_hora_0_7d: 138, total_ferias: 500, pct_ultima_hora: 27.6, antecedencia_media_dias: 16.7 },
  ],
  configuracao: {
    meta_pct_ultima_hora: 30,
  },
};

// ════════════════════════════════════════════════════════════
// 3. Ponto Batido em Férias (REAL)
// ════════════════════════════════════════════════════════════
export const PONTO_BATIDO = {
  totais_periodo: {
    ferias_total: 5551,
    ferias_com_ponto_batido_total: 5485,
    ferias_sem_cobertura_total: 1611,
    ponto_batido_ocorrencias_total: 135838,
    overtime_horas_total: 13683.2,
    ferias_equivalentes_com_he_total: 1710,
    pct_efetivo_afetado_periodo: 98.8,
  },
  serie_mensal: [
    { mes: "2025-04-01", ferias_com_ponto_batido: 428, ferias_sem_cobertura_identificada: 144, ferias_equivalentes_com_he: 115, total_ferias_no_mes: 433, ponto_batido_ocorrencias_total: 10446, overtime_horas: 917.3, pct_efetivo_afetado_ponto_batido: 98.8 },
    { mes: "2025-05-01", ferias_com_ponto_batido: 426, ferias_sem_cobertura_identificada: 130, ferias_equivalentes_com_he: 159, total_ferias_no_mes: 433, ponto_batido_ocorrencias_total: 10525, overtime_horas: 1273.2, pct_efetivo_afetado_ponto_batido: 98.4 },
    { mes: "2025-06-01", ferias_com_ponto_batido: 437, ferias_sem_cobertura_identificada: 133, ferias_equivalentes_com_he: 150, total_ferias_no_mes: 442, ponto_batido_ocorrencias_total: 10928, overtime_horas: 1200.1, pct_efetivo_afetado_ponto_batido: 98.9 },
    { mes: "2025-07-01", ferias_com_ponto_batido: 536, ferias_sem_cobertura_identificada: 169, ferias_equivalentes_com_he: 168, total_ferias_no_mes: 542, ponto_batido_ocorrencias_total: 13006, overtime_horas: 1340.9, pct_efetivo_afetado_ponto_batido: 98.9 },
    { mes: "2025-08-01", ferias_com_ponto_batido: 489, ferias_sem_cobertura_identificada: 150, ferias_equivalentes_com_he: 108, total_ferias_no_mes: 491, ponto_batido_ocorrencias_total: 12028, overtime_horas: 862.0, pct_efetivo_afetado_ponto_batido: 99.6 },
    { mes: "2025-09-01", ferias_com_ponto_batido: 438, ferias_sem_cobertura_identificada: 119, ferias_equivalentes_com_he: 130, total_ferias_no_mes: 442, ponto_batido_ocorrencias_total: 10662, overtime_horas: 1040.9, pct_efetivo_afetado_ponto_batido: 99.1 },
    { mes: "2025-10-01", ferias_com_ponto_batido: 489, ferias_sem_cobertura_identificada: 120, ferias_equivalentes_com_he: 112, total_ferias_no_mes: 493, ponto_batido_ocorrencias_total: 12113, overtime_horas: 892.7, pct_efetivo_afetado_ponto_batido: 99.2 },
    { mes: "2025-11-01", ferias_com_ponto_batido: 402, ferias_sem_cobertura_identificada: 83, ferias_equivalentes_com_he: 154, total_ferias_no_mes: 407, ponto_batido_ocorrencias_total: 10230, overtime_horas: 1231.8, pct_efetivo_afetado_ponto_batido: 98.8 },
    { mes: "2025-12-01", ferias_com_ponto_batido: 526, ferias_sem_cobertura_identificada: 220, ferias_equivalentes_com_he: 117, total_ferias_no_mes: 533, ponto_batido_ocorrencias_total: 12704, overtime_horas: 932.8, pct_efetivo_afetado_ponto_batido: 98.7 },
    { mes: "2026-01-01", ferias_com_ponto_batido: 465, ferias_sem_cobertura_identificada: 155, ferias_equivalentes_com_he: 148, total_ferias_no_mes: 476, ponto_batido_ocorrencias_total: 11801, overtime_horas: 1182.6, pct_efetivo_afetado_ponto_batido: 97.7 },
    { mes: "2026-02-01", ferias_com_ponto_batido: 355, ferias_sem_cobertura_identificada: 84, ferias_equivalentes_com_he: 143, total_ferias_no_mes: 359, ponto_batido_ocorrencias_total: 8864, overtime_horas: 1147.5, pct_efetivo_afetado_ponto_batido: 98.9 },
    { mes: "2026-03-01", ferias_com_ponto_batido: 494, ferias_sem_cobertura_identificada: 104, ferias_equivalentes_com_he: 208, total_ferias_no_mes: 500, ponto_batido_ocorrencias_total: 12468, overtime_horas: 1661.4, pct_efetivo_afetado_ponto_batido: 98.8 },
  ],
  configuracao: {
    tolerancia_pct_efetivo_afetado: 5,
  },
};

// ════════════════════════════════════════════════════════════
// 4. Mapa de Operações (REAL)
// ════════════════════════════════════════════════════════════
export const MAPA_OPERACOES = {
  limite_saudavel: 70,
  unidades: [
    { id: "SEG", nome_completo: "SEGURANÇA PATRIMONIAL", headcount: 18, score_ferias: 73, severidade: "verde" },
    { id: "TER", nome_completo: "TERCEIRIZAÇÃO", headcount: 22, score_ferias: 69, severidade: "laranja" },
    { id: "POR", nome_completo: "PORTARIA E LIMPEZA", headcount: 250, score_ferias: 50, severidade: "vermelho" },
  ],
};

// ════════════════════════════════════════════════════════════
// 5. Lista Nominal de Casos em Risco (MOCK)
// ════════════════════════════════════════════════════════════
export const CASOS_RISCO = {
  total_em_risco: 23,
  lista: [
    { id: "f001", colaborador: "Carlos S.", posto: "Posto SP-12", data_inicio: "2026-04-15", data_fim: "2026-05-14", duracao_dias: 30, status: "em_curso", tags_risco: ["ponto_batido", "sem_cobertura"] },
    { id: "f002", colaborador: "Maria O.", posto: "Posto RJ-08", data_inicio: "2026-04-18", data_fim: "2026-05-17", duracao_dias: 30, status: "em_curso", tags_risco: ["ponto_batido", "ultima_hora"] },
    { id: "f003", colaborador: "João R.", posto: "Posto SP-12", data_inicio: "2026-04-25", data_fim: "2026-05-09", duracao_dias: 15, status: "iminente", tags_risco: ["sobreposicao", "ultima_hora"] },
    { id: "f004", colaborador: "Ana P.", posto: "Posto MG-03", data_inicio: "2026-04-28", data_fim: "2026-05-27", duracao_dias: 30, status: "iminente", tags_risco: ["sem_cobertura"] },
    { id: "f005", colaborador: "Pedro L.", posto: "Posto RJ-15", data_inicio: "2026-04-30", data_fim: "2026-05-29", duracao_dias: 30, status: "iminente", tags_risco: ["cobertura_com_he"] },
    { id: "f006", colaborador: "Fernanda C.", posto: "Posto SP-08", data_inicio: "2026-05-02", data_fim: "2026-05-31", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido"] },
    { id: "f007", colaborador: "Roberto M.", posto: "Posto BA-04", data_inicio: "2026-05-04", data_fim: "2026-05-18", duracao_dias: 15, status: "futura", tags_risco: ["ultima_hora", "sem_cobertura"] },
    { id: "f008", colaborador: "Patrícia V.", posto: "Posto SP-22", data_inicio: "2026-05-05", data_fim: "2026-06-03", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido", "cobertura_com_he"] },
    { id: "f009", colaborador: "Lucas A.", posto: "Posto RJ-08", data_inicio: "2026-05-08", data_fim: "2026-05-22", duracao_dias: 15, status: "futura", tags_risco: ["sobreposicao"] },
    { id: "f010", colaborador: "Juliana B.", posto: "Posto PR-02", data_inicio: "2026-05-10", data_fim: "2026-06-08", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido"] },
    { id: "f011", colaborador: "Marcelo D.", posto: "Posto SP-12", data_inicio: "2026-05-12", data_fim: "2026-05-26", duracao_dias: 15, status: "futura", tags_risco: ["sobreposicao", "sem_cobertura"] },
    { id: "f012", colaborador: "Beatriz F.", posto: "Posto MG-03", data_inicio: "2026-05-14", data_fim: "2026-06-12", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido"] },
    { id: "f013", colaborador: "Rodrigo H.", posto: "Posto RJ-15", data_inicio: "2026-05-16", data_fim: "2026-06-14", duracao_dias: 30, status: "futura", tags_risco: ["sem_cobertura"] },
    { id: "f014", colaborador: "Camila I.", posto: "Posto SP-08", data_inicio: "2026-05-18", data_fim: "2026-06-01", duracao_dias: 15, status: "futura", tags_risco: ["ponto_batido", "ultima_hora"] },
    { id: "f015", colaborador: "Gustavo J.", posto: "Posto BA-04", data_inicio: "2026-05-20", data_fim: "2026-06-18", duracao_dias: 30, status: "futura", tags_risco: ["cobertura_com_he"] },
    { id: "f016", colaborador: "Larissa K.", posto: "Posto SP-22", data_inicio: "2026-05-22", data_fim: "2026-06-20", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido", "sobreposicao"] },
    { id: "f017", colaborador: "Bruno N.", posto: "Posto RJ-08", data_inicio: "2026-05-24", data_fim: "2026-06-07", duracao_dias: 15, status: "futura", tags_risco: ["ultima_hora"] },
    { id: "f018", colaborador: "Tatiane O.", posto: "Posto PR-02", data_inicio: "2026-05-26", data_fim: "2026-06-24", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido", "sem_cobertura"] },
    { id: "f019", colaborador: "Diego Q.", posto: "Posto SP-12", data_inicio: "2026-05-28", data_fim: "2026-06-26", duracao_dias: 30, status: "futura", tags_risco: ["ponto_batido"] },
    { id: "f020", colaborador: "Renata T.", posto: "Posto MG-03", data_inicio: "2026-05-30", data_fim: "2026-06-13", duracao_dias: 15, status: "futura", tags_risco: ["cobertura_com_he", "ultima_hora"] },
  ],
};

// ════════════════════════════════════════════════════════════
// 6. Heatmap de Postos (MOCK)
// ════════════════════════════════════════════════════════════
export const HEATMAP_POSTOS = {
  postos: [
    { id: "SP-12", nome: "Posto SP-12", unidade: "POR", celulas: [
      { mes: "2025-04-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2025-05-01", intensidade: "vermelho", ferias_problema: 7, ferias_total: 8 },
      { mes: "2025-06-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2025-07-01", intensidade: "vermelho", ferias_problema: 11, ferias_total: 12 },
      { mes: "2025-08-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2025-09-01", intensidade: "laranja", ferias_problema: 6, ferias_total: 9 },
      { mes: "2025-10-01", intensidade: "vermelho", ferias_problema: 10, ferias_total: 11 },
      { mes: "2025-11-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2025-12-01", intensidade: "vermelho", ferias_problema: 12, ferias_total: 13 },
      { mes: "2026-01-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2026-02-01", intensidade: "laranja", ferias_problema: 5, ferias_total: 8 },
      { mes: "2026-03-01", intensidade: "vermelho", ferias_problema: 10, ferias_total: 11 },
    ]},
    { id: "RJ-08", nome: "Posto RJ-08", unidade: "POR", celulas: [
      { mes: "2025-04-01", intensidade: "laranja", ferias_problema: 5, ferias_total: 7 },
      { mes: "2025-05-01", intensidade: "vermelho", ferias_problema: 7, ferias_total: 8 },
      { mes: "2025-06-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2025-07-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2025-08-01", intensidade: "laranja", ferias_problema: 4, ferias_total: 7 },
      { mes: "2025-09-01", intensidade: "amarelo", ferias_problema: 3, ferias_total: 8 },
      { mes: "2025-10-01", intensidade: "laranja", ferias_problema: 5, ferias_total: 9 },
      { mes: "2025-11-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2025-12-01", intensidade: "vermelho", ferias_problema: 11, ferias_total: 12 },
      { mes: "2026-01-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2026-02-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 6 },
      { mes: "2026-03-01", intensidade: "laranja", ferias_problema: 6, ferias_total: 9 },
    ]},
    { id: "MG-03", nome: "Posto MG-03", unidade: "TER", celulas: [
      { mes: "2025-04-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
      { mes: "2025-05-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
      { mes: "2025-06-01", intensidade: "laranja", ferias_problema: 4, ferias_total: 6 },
      { mes: "2025-07-01", intensidade: "laranja", ferias_problema: 5, ferias_total: 7 },
      { mes: "2025-08-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
      { mes: "2025-09-01", intensidade: "verde", ferias_problema: 1, ferias_total: 5 },
      { mes: "2025-10-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 6 },
      { mes: "2025-11-01", intensidade: "verde", ferias_problema: 0, ferias_total: 4 },
      { mes: "2025-12-01", intensidade: "laranja", ferias_problema: 5, ferias_total: 7 },
      { mes: "2026-01-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
      { mes: "2026-02-01", intensidade: "verde", ferias_problema: 0, ferias_total: 4 },
      { mes: "2026-03-01", intensidade: "amarelo", ferias_problema: 3, ferias_total: 6 },
    ]},
    { id: "SP-08", nome: "Posto SP-08", unidade: "POR", celulas: [
      { mes: "2025-04-01", intensidade: "vermelho", ferias_problema: 6, ferias_total: 7 },
      { mes: "2025-05-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2025-06-01", intensidade: "vermelho", ferias_problema: 7, ferias_total: 8 },
      { mes: "2025-07-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2025-08-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2025-09-01", intensidade: "laranja", ferias_problema: 5, ferias_total: 8 },
      { mes: "2025-10-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
      { mes: "2025-11-01", intensidade: "laranja", ferias_problema: 6, ferias_total: 8 },
      { mes: "2025-12-01", intensidade: "vermelho", ferias_problema: 11, ferias_total: 12 },
      { mes: "2026-01-01", intensidade: "vermelho", ferias_problema: 8, ferias_total: 9 },
      { mes: "2026-02-01", intensidade: "laranja", ferias_problema: 4, ferias_total: 7 },
      { mes: "2026-03-01", intensidade: "vermelho", ferias_problema: 9, ferias_total: 10 },
    ]},
    { id: "BA-04", nome: "Posto BA-04", unidade: "TER", celulas: [
      { mes: "2025-04-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
      { mes: "2025-05-01", intensidade: "verde", ferias_problema: 1, ferias_total: 4 },
      { mes: "2025-06-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
      { mes: "2025-07-01", intensidade: "laranja", ferias_problema: 4, ferias_total: 6 },
      { mes: "2025-08-01", intensidade: "verde", ferias_problema: 1, ferias_total: 5 },
      { mes: "2025-09-01", intensidade: "verde", ferias_problema: 0, ferias_total: 4 },
      { mes: "2025-10-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 6 },
      { mes: "2025-11-01", intensidade: "verde", ferias_problema: 0, ferias_total: 3 },
      { mes: "2025-12-01", intensidade: "amarelo", ferias_problema: 3, ferias_total: 6 },
      { mes: "2026-01-01", intensidade: "verde", ferias_problema: 1, ferias_total: 4 },
      { mes: "2026-02-01", intensidade: "verde", ferias_problema: 0, ferias_total: 3 },
      { mes: "2026-03-01", intensidade: "amarelo", ferias_problema: 2, ferias_total: 5 },
    ]},
  ],
  observacao: "5 postos para ilustração (em produção: top 30)",
};

// ════════════════════════════════════════════════════════════
// 7. Custo da Cobertura (MOCK, em milhares de R$)
// ════════════════════════════════════════════════════════════
export const CUSTO_COBERTURA = {
  premissas: {
    valor_hora_regular: 12.00,
    valor_hora_extra: 18.00,
    moeda: "BRL",
  },
  totais_periodo: {
    custo_total_periodo: 6846.5,
    custo_ferista_dedicado: 2861.8,
    custo_remanejo: 3574.5,
    custo_he: 246.3,
    custo_ideal_100pct_planejado: 6600.5,
    diferencial_economizavel: 246.3,
  },
  serie_mensal: [
    { mes: "2025-04-01", custo_ferista_dedicado: 173.9, custo_remanejo: 255.8, custo_he: 16.5, custo_total: 446.2, custo_ideal: 429.7 },
    { mes: "2025-05-01", custo_ferista_dedicado: 201.4, custo_remanejo: 279.8, custo_he: 22.9, custo_total: 504.1, custo_ideal: 481.2 },
    { mes: "2025-06-01", custo_ferista_dedicado: 223.6, custo_remanejo: 296.7, custo_he: 21.6, custo_total: 541.9, custo_ideal: 520.3 },
    { mes: "2025-07-01", custo_ferista_dedicado: 285.3, custo_remanejo: 325.0, custo_he: 24.1, custo_total: 634.4, custo_ideal: 610.3 },
    { mes: "2025-08-01", custo_ferista_dedicado: 275.6, custo_remanejo: 290.2, custo_he: 15.5, custo_total: 581.3, custo_ideal: 565.8 },
    { mes: "2025-09-01", custo_ferista_dedicado: 270.2, custo_remanejo: 251.5, custo_he: 18.7, custo_total: 540.4, custo_ideal: 521.7 },
    { mes: "2025-10-01", custo_ferista_dedicado: 309.6, custo_remanejo: 302.4, custo_he: 16.1, custo_total: 628.1, custo_ideal: 612.0 },
    { mes: "2025-11-01", custo_ferista_dedicado: 277.5, custo_remanejo: 258.6, custo_he: 22.2, custo_total: 558.3, custo_ideal: 536.1 },
    { mes: "2025-12-01", custo_ferista_dedicado: 238.8, custo_remanejo: 257.4, custo_he: 16.8, custo_total: 513.0, custo_ideal: 496.2 },
    { mes: "2026-01-01", custo_ferista_dedicado: 233.2, custo_remanejo: 325.2, custo_he: 21.3, custo_total: 579.7, custo_ideal: 558.4 },
    { mes: "2026-02-01", custo_ferista_dedicado: 171.5, custo_remanejo: 283.5, custo_he: 20.7, custo_total: 475.7, custo_ideal: 455.0 },
    { mes: "2026-03-01", custo_ferista_dedicado: 201.2, custo_remanejo: 448.4, custo_he: 29.9, custo_total: 679.5, custo_ideal: 649.6 },
  ],
};

// ════════════════════════════════════════════════════════════
// 8. Tendência do Score (MOCK)
// ════════════════════════════════════════════════════════════
export const TENDENCIA_SCORE = {
  score_atual: 58,
  score_anterior_12m: 66,
  delta_pp: -8,
  serie_mensal: [
    { mes: "2025-04-01", score: 67 },
    { mes: "2025-05-01", score: 60 },
    { mes: "2025-06-01", score: 56 },
    { mes: "2025-07-01", score: 60 },
    { mes: "2025-08-01", score: 62 },
    { mes: "2025-09-01", score: 67 },
    { mes: "2025-10-01", score: 60 },
    { mes: "2025-11-01", score: 70 },
    { mes: "2025-12-01", score: 55 },
    { mes: "2026-01-01", score: 65 },
    { mes: "2026-02-01", score: 70 },
    { mes: "2026-03-01", score: 58 },
  ],
};

// ════════════════════════════════════════════════════════════
// 9. Comparativo Componentes do Score por Unidade (MOCK)
// ════════════════════════════════════════════════════════════
export const COMPARATIVO_UNIDADES = {
  unidades: [
    {
      id: "SEG",
      nome_completo: "SEGURANÇA PATRIMONIAL",
      score_geral: 73,
      componentes: { he_cobertura_pct: 1.5, ultima_hora_pct: 25, ponto_batido_pct: 95, sem_cobertura_pct: 18, antecedencia_dias: 22 },
    },
    {
      id: "TER",
      nome_completo: "TERCEIRIZAÇÃO",
      score_geral: 69,
      componentes: { he_cobertura_pct: 2.1, ultima_hora_pct: 38, ponto_batido_pct: 99, sem_cobertura_pct: 24, antecedencia_dias: 14 },
    },
    {
      id: "POR",
      nome_completo: "PORTARIA E LIMPEZA",
      score_geral: 50,
      componentes: { he_cobertura_pct: 3.2, ultima_hora_pct: 42, ponto_batido_pct: 99, sem_cobertura_pct: 35, antecedencia_dias: 11 },
    },
  ],
  configuracao: {
    limites_saudaveis: {
      he_cobertura_pct_maximo: 5,
      ultima_hora_pct_maximo: 30,
      ponto_batido_pct_maximo: 5,
      sem_cobertura_pct_maximo: 15,
      antecedencia_dias_minimo: 30,
    },
  },
};

// ════════════════════════════════════════════════════════════
// 10. Hall da Glória / Vergonha (MOCK)
// ════════════════════════════════════════════════════════════
export const HALL_GLORIA_VERGONHA = {
  hall_da_gloria: [
    { posicao: 1, posto_id: "SP-15", posto_nome: "Posto SP-15", unidade: "SEG", score: 92, ferias_periodo: 24, virtude_principal: "Cobertura 100% via ferista dedicado, zero ponto batido" },
    { posicao: 2, posto_id: "RJ-03", posto_nome: "Posto RJ-03", unidade: "SEG", score: 89, ferias_periodo: 18, virtude_principal: "Antecedência média 35 dias, planejamento exemplar" },
    { posicao: 3, posto_id: "MG-07", posto_nome: "Posto MG-07", unidade: "TER", score: 86, ferias_periodo: 15, virtude_principal: "HE em cobertura abaixo de 1%, recurso planejado" },
    { posicao: 4, posto_id: "PR-04", posto_nome: "Posto PR-04", unidade: "TER", score: 84, ferias_periodo: 12, virtude_principal: "Cobertura formal em 100% das férias" },
    { posicao: 5, posto_id: "SP-09", posto_nome: "Posto SP-09", unidade: "SEG", score: 82, ferias_periodo: 21, virtude_principal: "Disciplina consistente em 12 meses seguidos" },
  ],
  hall_da_vergonha: [
    { posicao: 1, posto_id: "SP-12", posto_nome: "Posto SP-12", unidade: "POR", score: 28, ferias_periodo: 45, problema_principal: "98% das férias com ponto batido + 60% sem cobertura" },
    { posicao: 2, posto_id: "RJ-08", posto_nome: "Posto RJ-08", unidade: "POR", score: 32, ferias_periodo: 38, problema_principal: "75% das férias lançadas em 0-7 dias, gestão totalmente reativa" },
    { posicao: 3, posto_id: "SP-08", posto_nome: "Posto SP-08", unidade: "POR", score: 35, ferias_periodo: 41, problema_principal: "55% sem cobertura formal, postos descobertos sistematicamente" },
    { posicao: 4, posto_id: "BA-12", posto_nome: "Posto BA-12", unidade: "POR", score: 38, ferias_periodo: 28, problema_principal: "HE em cobertura ultrapassa 8%, custo elevado" },
    { posicao: 5, posto_id: "SP-22", posto_nome: "Posto SP-22", unidade: "POR", score: 41, ferias_periodo: 33, problema_principal: "Todas as férias com ponto batido, escala não desativada" },
  ],
};
