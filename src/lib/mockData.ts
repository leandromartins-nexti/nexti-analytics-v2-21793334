export const idleHoursByRole = [
  { role: "Assistente de Serviços Gerais", hours: 1250, company: "Nexti", unit: "Orsegups" },
  { role: "Auxiliar de Limpeza", hours: 980, company: "Nexti", unit: "Orbenk" },
  { role: "Porteiro", hours: 750, company: "G4S", unit: "Verzani" },
  { role: "Recepcionista", hours: 620, company: "JCC", unit: "Verzani" },
  { role: "Supervisor", hours: 450, company: "Nexti", unit: "G4S" },
];

export const coverageReasons = [
  { name: "Férias", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Falta", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Afastamento", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Licença Médica", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Outros", value: 7, color: "hsl(var(--chart-5))" },
];

export const coverageReasonsByMonth = [
  { month: "Jan", Férias: 45, Falta: 35, Afastamento: 22, "Licença Médica": 15, Outros: 8 },
  { month: "Fev", Férias: 52, Falta: 38, Afastamento: 25, "Licença Médica": 18, Outros: 10 },
  { month: "Mar", Férias: 58, Falta: 42, Afastamento: 28, "Licença Médica": 20, Outros: 12 },
  { month: "Abr", Férias: 62, Falta: 45, Afastamento: 30, "Licença Médica": 22, Outros: 13 },
  { month: "Mai", Férias: 68, Falta: 48, Afastamento: 32, "Licença Médica": 24, Outros: 15 },
  { month: "Jun", Férias: 72, Falta: 50, Afastamento: 35, "Licença Médica": 25, Outros: 16 },
  { month: "Jul", Férias: 78, Falta: 52, Afastamento: 38, "Licença Médica": 28, Outros: 18 },
  { month: "Ago", Férias: 82, Falta: 55, Afastamento: 40, "Licença Médica": 30, Outros: 20 },
  { month: "Set", Férias: 85, Falta: 58, Afastamento: 42, "Licença Médica": 32, Outros: 21 },
  { month: "Out", Férias: 88, Falta: 60, Afastamento: 45, "Licença Médica": 33, Outros: 22 },
  { month: "Nov", Férias: 90, Falta: 62, Afastamento: 46, "Licença Médica": 35, Outros: 23 },
  { month: "Dez", Férias: 92, Falta: 65, Afastamento: 48, "Licença Médica": 36, Outros: 25 },
];

export const absenceReasons = [
  { name: "Atestado Médico", value: 32, color: "hsl(var(--chart-1))" },
  { name: "Falta", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Férias", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Afastamento INSS", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Licença", value: 8, color: "hsl(var(--chart-5))" },
  { name: "Outros", value: 5, color: "hsl(var(--chart-6))" },
];

export const absenceReasonsByMonth = [
  { month: "Jan", "Atestado Médico": 48, Falta: 38, Férias: 28, "Afastamento INSS": 18, Licença: 12, Outros: 8 },
  { month: "Fev", "Atestado Médico": 52, Falta: 42, Férias: 30, "Afastamento INSS": 20, Licença: 14, Outros: 9 },
  { month: "Mar", "Atestado Médico": 58, Falta: 45, Férias: 32, "Afastamento INSS": 22, Licença: 15, Outros: 10 },
  { month: "Abr", "Atestado Médico": 62, Falta: 48, Férias: 35, "Afastamento INSS": 24, Licença: 16, Outros: 11 },
  { month: "Mai", "Atestado Médico": 65, Falta: 50, Férias: 38, "Afastamento INSS": 25, Licença: 18, Outros: 12 },
  { month: "Jun", "Atestado Médico": 70, Falta: 52, Férias: 40, "Afastamento INSS": 28, Licença: 20, Outros: 13 },
  { month: "Jul", "Atestado Médico": 75, Falta: 55, Férias: 42, "Afastamento INSS": 30, Licença: 22, Outros: 14 },
  { month: "Ago", "Atestado Médico": 78, Falta: 58, Férias: 45, "Afastamento INSS": 32, Licença: 24, Outros: 15 },
  { month: "Set", "Atestado Médico": 82, Falta: 60, Férias: 48, "Afastamento INSS": 34, Licença: 25, Outros: 16 },
  { month: "Out", "Atestado Médico": 85, Falta: 62, Férias: 50, "Afastamento INSS": 36, Licença: 26, Outros: 17 },
  { month: "Nov", "Atestado Médico": 88, Falta: 65, Férias: 52, "Afastamento INSS": 38, Licença: 28, Outros: 18 },
  { month: "Dez", "Atestado Médico": 92, Falta: 68, Férias: 55, "Afastamento INSS": 40, Licença: 30, Outros: 20 },
];

export const coverageEvolution = [
  { month: "Jan", coveragesSent: 145, absences: 180 },
  { month: "Fev", coveragesSent: 168, absences: 195 },
  { month: "Mar", coveragesSent: 182, absences: 210 },
  { month: "Abr", coveragesSent: 195, absences: 220 },
  { month: "Mai", coveragesSent: 210, absences: 235 },
  { month: "Jun", coveragesSent: 225, absences: 240 },
  { month: "Jul", coveragesSent: 238, absences: 255 },
  { month: "Ago", coveragesSent: 252, absences: 270 },
  { month: "Set", coveragesSent: 265, absences: 280 },
  { month: "Out", coveragesSent: 278, absences: 290 },
  { month: "Nov", coveragesSent: 285, absences: 295 },
  { month: "Dez", coveragesSent: 290, absences: 300 },
];

export const reservaTecnicaEvolution = [
  { month: "Jan", hours: 2100 },
  { month: "Fev", hours: 1950 },
  { month: "Mar", hours: 1850 },
  { month: "Abr", hours: 1720 },
  { month: "Mai", hours: 1680 },
  { month: "Jun", hours: 1550 },
  { month: "Jul", hours: 1480 },
  { month: "Ago", hours: 1420 },
  { month: "Set", hours: 1350 },
  { month: "Out", hours: 1280 },
  { month: "Nov", hours: 1150 },
  { month: "Dez", hours: 1050 },
];

export const inconsistencyRanking = [
  { rank: 1, name: "João Silva", role: "Porteiro", company: "Nexti", unit: "Orsegups", inconsistencies: 45 },
  { rank: 2, name: "Maria Santos", role: "Recepcionista", company: "G4S", unit: "Nexti", inconsistencies: 38 },
  { rank: 3, name: "Pedro Costa", role: "Auxiliar de Limpeza", company: "JCC", unit: "Orbenk", inconsistencies: 35 },
  { rank: 4, name: "Ana Oliveira", role: "Assistente de Serviços Gerais", company: "Nexti", unit: "Verzani", inconsistencies: 32 },
  { rank: 5, name: "Carlos Souza", role: "Supervisor", company: "G4S", unit: "G4S", inconsistencies: 28 },
  { rank: 6, name: "Julia Lima", role: "Porteiro", company: "JCC", unit: "JCC", inconsistencies: 25 },
  { rank: 7, name: "Roberto Alves", role: "Auxiliar de Limpeza", company: "Nexti", unit: "Verzani", inconsistencies: 22 },
  { rank: 8, name: "Fernanda Dias", role: "Recepcionista", company: "G4S", unit: "Orsegups", inconsistencies: 20 },
  { rank: 9, name: "Lucas Mendes", role: "Assistente de Serviços Gerais", company: "Nexti", unit: "Nexti", inconsistencies: 18 },
  { rank: 10, name: "Patricia Rocha", role: "Supervisor", company: "JCC", unit: "G4S", inconsistencies: 15 },
];

export const inconsistencyTypes = [
  { type: "Horário Inválido", count: 156 },
  { type: "Não Registrado", count: 132 },
  { type: "Terminal Não Autorizado", count: 98 },
  { type: "Fora do Perímetro", count: 87 },
  { type: "Marcação Duplicada", count: 65 },
];

export const inconsistencyTypesByMonth = [
  { month: "Jan", "Horário Inválido": 12, "Não Registrado": 10, "Terminal Não Autorizado": 8, "Fora do Perímetro": 7, "Marcação Duplicada": 5 },
  { month: "Fev", "Horário Inválido": 14, "Não Registrado": 11, "Terminal Não Autorizado": 9, "Fora do Perímetro": 8, "Marcação Duplicada": 6 },
  { month: "Mar", "Horário Inválido": 15, "Não Registrado": 13, "Terminal Não Autorizado": 10, "Fora do Perímetro": 9, "Marcação Duplicada": 6 },
  { month: "Abr", "Horário Inválido": 16, "Não Registrado": 14, "Terminal Não Autorizado": 11, "Fora do Perímetro": 9, "Marcação Duplicada": 7 },
  { month: "Mai", "Horário Inválido": 18, "Não Registrado": 15, "Terminal Não Autorizado": 12, "Fora do Perímetro": 10, "Marcação Duplicada": 8 },
  { month: "Jun", "Horário Inválido": 19, "Não Registrado": 16, "Terminal Não Autorizado": 13, "Fora do Perímetro": 11, "Marcação Duplicada": 8 },
  { month: "Jul", "Horário Inválido": 20, "Não Registrado": 17, "Terminal Não Autorizado": 14, "Fora do Perímetro": 12, "Marcação Duplicada": 9 },
  { month: "Ago", "Horário Inválido": 22, "Não Registrado": 18, "Terminal Não Autorizado": 15, "Fora do Perímetro": 13, "Marcação Duplicada": 10 },
  { month: "Set", "Horário Inválido": 24, "Não Registrado": 19, "Terminal Não Autorizado": 16, "Fora do Perímetro": 14, "Marcação Duplicada": 11 },
  { month: "Out", "Horário Inválido": 25, "Não Registrado": 20, "Terminal Não Autorizado": 17, "Fora do Perímetro": 15, "Marcação Duplicada": 12 },
  { month: "Nov", "Horário Inválido": 26, "Não Registrado": 21, "Terminal Não Autorizado": 18, "Fora do Perímetro": 16, "Marcação Duplicada": 13 },
  { month: "Dez", "Horário Inválido": 28, "Não Registrado": 22, "Terminal Não Autorizado": 19, "Fora do Perímetro": 17, "Marcação Duplicada": 14 },
];

export const inconsistencyByBusinessUnit = [
  { month: "Jan", Orsegups: 15, Nexti: 12, Orbenk: 10, Verzani: 8, G4S: 7, JCC: 6 },
  { month: "Fev", Orsegups: 18, Nexti: 14, Orbenk: 12, Verzani: 9, G4S: 8, JCC: 7 },
  { month: "Mar", Orsegups: 20, Nexti: 16, Orbenk: 13, Verzani: 10, G4S: 9, JCC: 8 },
  { month: "Abr", Orsegups: 22, Nexti: 18, Orbenk: 14, Verzani: 11, G4S: 10, JCC: 9 },
  { month: "Mai", Orsegups: 25, Nexti: 20, Orbenk: 16, Verzani: 12, G4S: 11, JCC: 10 },
  { month: "Jun", Orsegups: 28, Nexti: 22, Orbenk: 18, Verzani: 14, G4S: 12, JCC: 11 },
  { month: "Jul", Orsegups: 30, Nexti: 24, Orbenk: 20, Verzani: 15, G4S: 13, JCC: 12 },
  { month: "Ago", Orsegups: 32, Nexti: 26, Orbenk: 22, Verzani: 16, G4S: 14, JCC: 13 },
  { month: "Set", Orsegups: 35, Nexti: 28, Orbenk: 24, Verzani: 18, G4S: 15, JCC: 14 },
  { month: "Out", Orsegups: 38, Nexti: 30, Orbenk: 26, Verzani: 20, G4S: 16, JCC: 15 },
  { month: "Nov", Orsegups: 40, Nexti: 32, Orbenk: 28, Verzani: 22, G4S: 18, JCC: 16 },
  { month: "Dez", Orsegups: 42, Nexti: 35, Orbenk: 30, Verzani: 24, G4S: 20, JCC: 18 },
];

export const markingQuality = [
  { name: "Marcações Corretas", value: 85, color: "hsl(var(--success))" },
  { name: "Com Inconsistência", value: 15, color: "hsl(var(--destructive))" },
];

export const averageTimeByMonth = [
  { month: "Jan", treatment: "04:20", inconsistency: "08:15" },
  { month: "Fev", treatment: "04:35", inconsistency: "08:30" },
  { month: "Mar", treatment: "04:28", inconsistency: "08:22" },
  { month: "Abr", treatment: "04:15", inconsistency: "07:58" },
  { month: "Mai", treatment: "04:42", inconsistency: "08:45" },
  { month: "Jun", treatment: "04:38", inconsistency: "08:35" },
  { month: "Jul", treatment: "07:10", inconsistency: "09:20" },
  { month: "Ago", treatment: "04:25", inconsistency: "08:18" },
  { month: "Set", treatment: "04:33", inconsistency: "08:28" },
  { month: "Out", treatment: "04:22", inconsistency: "08:10" },
  { month: "Nov", treatment: "04:39", inconsistency: "08:42" },
  { month: "Dez", treatment: "04:53", inconsistency: "08:53" },
];

export const adjustmentReasons = [
  { reason: "Esquecimento de marcar", count: 245, percentage: 24.5 },
  { reason: "Erro no horário", count: 198, percentage: 19.8 },
  { reason: "Problema técnico no terminal", count: 156, percentage: 15.6 },
  { reason: "Ausência não registrada", count: 142, percentage: 14.2 },
  { reason: "Marcação em local errado", count: 127, percentage: 12.7 },
  { reason: "Outros", count: 132, percentage: 13.2 },
];

export const inconsistencyReasons = [
  { reason: "Horário Inválido", count: 89, percentage: 29.7 },
  { reason: "Não Registrado", count: 76, percentage: 25.3 },
  { reason: "Terminal Não Autorizado", count: 54, percentage: 18.0 },
  { reason: "Fora do Perímetro", count: 48, percentage: 16.0 },
  { reason: "Marcação Duplicada", count: 33, percentage: 11.0 },
];

// Drill down data for Coverage Evolution
export const coverageEvolutionByCompany = [
  { month: "Jan", absences: 180, coveragesSent: 145, company: "Nexti" },
  { month: "Fev", absences: 195, coveragesSent: 168, company: "Nexti" },
  { month: "Mar", absences: 210, coveragesSent: 182, company: "Nexti" },
  { month: "Abr", absences: 220, coveragesSent: 195, company: "G4S" },
  { month: "Mai", absences: 235, coveragesSent: 210, company: "G4S" },
  { month: "Jun", absences: 240, coveragesSent: 225, company: "JCC" },
];

export const coverageEvolutionByArea = [
  { month: "Jan", absences: 90, coveragesSent: 72, area: "Administrativa", company: "Nexti" },
  { month: "Fev", absences: 98, coveragesSent: 84, area: "Administrativa", company: "Nexti" },
  { month: "Mar", absences: 105, coveragesSent: 91, area: "Operacional", company: "Nexti" },
  { month: "Abr", absences: 110, coveragesSent: 98, area: "Operacional", company: "G4S" },
  { month: "Mai", absences: 118, coveragesSent: 105, area: "Comercial", company: "G4S" },
  { month: "Jun", absences: 120, coveragesSent: 113, area: "Comercial", company: "JCC" },
];

export const coverageEvolutionByClient = [
  { month: "Jan", absences: 45, coveragesSent: 36, client: "Cliente A", area: "Administrativa" },
  { month: "Fev", absences: 49, coveragesSent: 42, client: "Cliente A", area: "Administrativa" },
  { month: "Mar", absences: 53, coveragesSent: 46, client: "Cliente B", area: "Operacional" },
  { month: "Abr", absences: 55, coveragesSent: 49, client: "Cliente B", area: "Operacional" },
  { month: "Mai", absences: 59, coveragesSent: 53, client: "Cliente C", area: "Comercial" },
  { month: "Jun", absences: 60, coveragesSent: 57, client: "Cliente C", area: "Comercial" },
];

export const coverageEvolutionByPosition = [
  { month: "Jan", absences: 23, coveragesSent: 18, position: "Porteiro", client: "Cliente A" },
  { month: "Fev", absences: 25, coveragesSent: 21, position: "Porteiro", client: "Cliente A" },
  { month: "Mar", absences: 27, coveragesSent: 23, position: "Recepcionista", client: "Cliente B" },
  { month: "Abr", absences: 28, coveragesSent: 25, position: "Recepcionista", client: "Cliente B" },
  { month: "Mai", absences: 30, coveragesSent: 27, position: "Supervisor", client: "Cliente C" },
  { month: "Jun", absences: 30, coveragesSent: 29, position: "Supervisor", client: "Cliente C" },
];

export const coverageEvolutionByEmployee = [
  { month: "Jan", absences: 12, coveragesSent: 9, employee: "João Silva", position: "Porteiro" },
  { month: "Fev", absences: 13, coveragesSent: 11, employee: "João Silva", position: "Porteiro" },
  { month: "Mar", absences: 14, coveragesSent: 12, employee: "Maria Santos", position: "Recepcionista" },
  { month: "Abr", absences: 14, coveragesSent: 13, employee: "Maria Santos", position: "Recepcionista" },
  { month: "Mai", absences: 15, coveragesSent: 14, employee: "Pedro Costa", position: "Supervisor" },
  { month: "Jun", absences: 15, coveragesSent: 15, employee: "Pedro Costa", position: "Supervisor" },
];
