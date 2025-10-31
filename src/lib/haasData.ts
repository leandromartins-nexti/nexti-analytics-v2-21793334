// Haas - Devices Data

export interface DeviceLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  status: 'online' | 'offline' | 'maintenance';
  posto: string;
  type: 'Terminal' | 'Smart';
  version?: string;
  model?: string;
  empresa?: string;
  cliente?: string;
}

// Device Status (Online/Offline)
export const deviceStatus = [
  { name: "Online", value: 78, color: "hsl(var(--success))" },
  { name: "Offline", value: 22, color: "hsl(var(--destructive))" },
];

// Devices Linked to Posts
export const devicesLinkedToPosts = [
  { name: "Vinculados", value: 85, color: "hsl(var(--chart-1))" },
  { name: "Não Vinculados", value: 15, color: "hsl(var(--chart-3))" },
];

// Device Type Distribution (Smart vs TBIs)
export const deviceTypeDistribution = [
  { name: "Smart", value: 60, color: "hsl(var(--chart-2))" },
  { name: "TBIs", value: 40, color: "hsl(var(--chart-1))" },
];

// Devices Out of Perimeter
export const devicesOutOfPerimeter = [
  { rank: 1, deviceId: "TRM-001", type: "Terminal", post: "Shopping Center Norte", lastLocation: "Rua das Flores, 123", distance: "2.5 km" },
  { rank: 2, deviceId: "SMT-045", type: "Nexti Smart", post: "Condomínio Residencial", lastLocation: "Av. Paulista, 1000", distance: "1.8 km" },
  { rank: 3, deviceId: "TRM-012", type: "Terminal", post: "Hospital Regional", lastLocation: "Rua Central, 456", distance: "3.2 km" },
  { rank: 4, deviceId: "SMT-078", type: "Nexti Smart", post: "Universidade", lastLocation: "Praça da Sé, s/n", distance: "0.9 km" },
  { rank: 5, deviceId: "TRM-023", type: "Terminal", post: "Fábrica", lastLocation: "Rua Industrial, 789", distance: "4.1 km" },
  { rank: 6, deviceId: "SMT-091", type: "Nexti Smart", post: "Shopping Center Sul", lastLocation: "Av. Brasil, 2000", distance: "1.5 km" },
  { rank: 7, deviceId: "TRM-034", type: "Terminal", post: "Condomínio Empresarial", lastLocation: "Rua Comercial, 333", distance: "2.0 km" },
];

// Device Locations for Map
export const deviceLocations: DeviceLocation[] = [
  { id: 'TRM-001', name: 'Terminal Centro', coordinates: [-46.6333, -23.5505], status: 'online', posto: 'Shopping Center Norte', type: 'Terminal', version: 'v2.0', model: 'V2', empresa: 'Empresa A', cliente: 'Cliente 1' },
  { id: 'SMT-045', name: 'Smart Norte', coordinates: [-46.6180, -23.5200], status: 'online', posto: 'Condomínio Residencial', type: 'Smart', version: 'v3.0', empresa: 'Empresa A', cliente: 'Cliente 2' },
  { id: 'TRM-012', name: 'Terminal Sul', coordinates: [-46.6500, -23.5800], status: 'offline', posto: 'Hospital Regional', type: 'Terminal', version: 'v1.0', model: 'V1', empresa: 'Empresa B', cliente: 'Cliente 3' },
  { id: 'SMT-078', name: 'Smart Leste', coordinates: [-46.5800, -23.5505], status: 'online', posto: 'Universidade', type: 'Smart', version: 'v2.0', empresa: 'Empresa B', cliente: 'Cliente 4' },
  { id: 'TRM-023', name: 'Terminal Oeste', coordinates: [-46.6900, -23.5505], status: 'maintenance', posto: 'Fábrica', type: 'Terminal', version: 'v2.0', model: 'V2', empresa: 'Empresa A', cliente: 'Cliente 1' },
  { id: 'SMT-091', name: 'Smart Shopping', coordinates: [-46.6450, -23.5350], status: 'online', posto: 'Shopping Center Sul', type: 'Smart', version: 'v3.0', empresa: 'Empresa C', cliente: 'Cliente 5' },
  { id: 'TRM-034', name: 'Terminal Industrial', coordinates: [-46.6100, -23.5650], status: 'online', posto: 'Condomínio Empresarial', type: 'Terminal', version: 'v3.0', model: 'V3', empresa: 'Empresa A', cliente: 'Cliente 2' },
  { id: 'SMT-102', name: 'Smart Aeroporto', coordinates: [-46.6550, -23.4320], status: 'offline', posto: 'Posto Aeroporto', type: 'Smart', version: 'v1.0', empresa: 'Empresa B', cliente: 'Cliente 3' },
  { id: 'TRM-045', name: 'Terminal Matriz', coordinates: [-46.6280, -23.5420], status: 'online', posto: 'Posto Matriz', type: 'Terminal', version: 'v2.0', model: 'V2', empresa: 'Empresa C', cliente: 'Cliente 6' },
  { id: 'SMT-115', name: 'Smart Rodoviária', coordinates: [-46.6370, -23.5260], status: 'online', posto: 'Posto Rodoviária', type: 'Smart', version: 'v2.0', empresa: 'Empresa A', cliente: 'Cliente 1' },
  { id: 'TRM-056', name: 'Terminal Zona Norte', coordinates: [-46.6250, -23.4980], status: 'maintenance', posto: 'Posto Norte 2', type: 'Terminal', version: 'v1.0', model: 'V1', empresa: 'Empresa B', cliente: 'Cliente 4' },
  { id: 'SMT-128', name: 'Smart Zona Sul', coordinates: [-46.6580, -23.6100], status: 'online', posto: 'Posto Sul 2', type: 'Smart', version: 'v3.0', empresa: 'Empresa C', cliente: 'Cliente 5' },
];

// Smart Software Versions Distribution
export const smartVersions = [
  { name: "v3.0", value: 40, color: "hsl(var(--chart-1))" },
  { name: "v2.0", value: 35, color: "hsl(var(--chart-2))" },
  { name: "v1.0", value: 25, color: "hsl(var(--chart-3))" },
];

// Terminal Software Versions Distribution
export const terminalVersions = [
  { name: "v2.0", value: 50, color: "hsl(var(--chart-1))" },
  { name: "v1.0", value: 30, color: "hsl(var(--chart-2))" },
  { name: "v3.0", value: 20, color: "hsl(var(--chart-4))" },
];

// Terminal Model Distribution
export const terminalModels = [
  { name: "V2", value: 50, color: "hsl(var(--chart-1))" },
  { name: "V1", value: 30, color: "hsl(var(--chart-2))" },
  { name: "V3", value: 20, color: "hsl(var(--chart-4))" },
];

// Device Distribution by Company (Rateio)
export const devicesByCompanyTable = [
  { 
    empresa: "Empresa A", 
    cnpj: "12.345.678/0001-90", 
    tablets: 3, 
    tbis: 2
  },
  { 
    empresa: "Empresa B", 
    cnpj: "98.765.432/0001-10", 
    tablets: 2, 
    tbis: 2
  },
  { 
    empresa: "Empresa C", 
    cnpj: "11.222.333/0001-44", 
    tablets: 2, 
    tbis: 1
  },
];

// Clients by Company (drill-down level 1)
export const clientsByCompany: Record<string, { cliente: string; cnpj: string; tablets: number; tbis: number }[]> = {
  "Empresa A": [
    { cliente: "Cliente 1", cnpj: "12.345.678/0001-91", tablets: 2, tbis: 1 },
    { cliente: "Cliente 2", cnpj: "12.345.678/0001-92", tablets: 1, tbis: 1 },
  ],
  "Empresa B": [
    { cliente: "Cliente 3", cnpj: "98.765.432/0001-11", tablets: 1, tbis: 1 },
    { cliente: "Cliente 4", cnpj: "98.765.432/0001-12", tablets: 1, tbis: 1 },
  ],
  "Empresa C": [
    { cliente: "Cliente 5", cnpj: "11.222.333/0001-45", tablets: 1, tbis: 0 },
    { cliente: "Cliente 6", cnpj: "11.222.333/0001-46", tablets: 1, tbis: 1 },
  ],
};

// Posts by Client (drill-down level 2)
export const postsByClient: Record<string, { posto: string; cc: string; tablets: number; tbis: number }[]> = {
  "Cliente 1": [
    { posto: "Shopping Center Norte", cc: "CC-001", tablets: 0, tbis: 1 },
    { posto: "Fábrica", cc: "CC-005", tablets: 0, tbis: 1 },
    { posto: "Posto Rodoviária", cc: "CC-010", tablets: 2, tbis: 0 },
  ],
  "Cliente 2": [
    { posto: "Condomínio Residencial", cc: "CC-002", tablets: 1, tbis: 0 },
    { posto: "Condomínio Empresarial", cc: "CC-007", tablets: 0, tbis: 1 },
  ],
  "Cliente 3": [
    { posto: "Hospital Regional", cc: "CC-003", tablets: 0, tbis: 1 },
    { posto: "Posto Aeroporto", cc: "CC-008", tablets: 1, tbis: 0 },
  ],
  "Cliente 4": [
    { posto: "Universidade", cc: "CC-004", tablets: 1, tbis: 0 },
    { posto: "Posto Norte 2", cc: "CC-011", tablets: 0, tbis: 1 },
  ],
  "Cliente 5": [
    { posto: "Shopping Center Sul", cc: "CC-006", tablets: 1, tbis: 0 },
    { posto: "Posto Sul 2", cc: "CC-012", tablets: 1, tbis: 0 },
  ],
  "Cliente 6": [
    { posto: "Posto Matriz", cc: "CC-009", tablets: 0, tbis: 1 },
  ],
};

// Legacy data (kept for backward compatibility)
export const devicesByCompany = [
  { name: "Empresa A", value: 45, color: "#3b82f6" },
  { name: "Empresa B", value: 30, color: "#10b981" },
  { name: "Empresa C", value: 25, color: "#f59e0b" },
];

export const devicesByClient: Record<string, { name: string; value: number; color: string }[]> = {
  "Empresa A": [
    { name: "Cliente 1", value: 20, color: "#3b82f6" },
    { name: "Cliente 2", value: 15, color: "#06b6d4" },
    { name: "Outros", value: 10, color: "#8b5cf6" },
  ],
  "Empresa B": [
    { name: "Cliente 3", value: 15, color: "#10b981" },
    { name: "Cliente 4", value: 10, color: "#14b8a6" },
    { name: "Outros", value: 5, color: "#22c55e" },
  ],
  "Empresa C": [
    { name: "Cliente 5", value: 12, color: "#f59e0b" },
    { name: "Cliente 6", value: 8, color: "#f97316" },
    { name: "Outros", value: 5, color: "#fb923c" },
  ],
};

// Posts without devices
export const postsWithoutSmarts = [
  { rank: 1, posto: "Posto Norte 3", cliente: "Cliente 7", empresa: "Empresa A" },
  { rank: 2, posto: "Posto Central", cliente: "Cliente 8", empresa: "Empresa B" },
  { rank: 3, posto: "Posto Leste 2", cliente: "Cliente 9", empresa: "Empresa C" },
];

export const postsWithoutTerminals = [
  { rank: 1, posto: "Posto Sul 3", cliente: "Cliente 10", empresa: "Empresa A" },
  { rank: 2, posto: "Posto Oeste 2", cliente: "Cliente 11", empresa: "Empresa B" },
  { rank: 3, posto: "Posto Industrial 2", cliente: "Cliente 12", empresa: "Empresa C" },
];

// Terminals in maintenance
export const terminalsInMaintenance = [
  { rank: 1, deviceId: "TRM-023", posto: "Fábrica", cliente: "Cliente 1", motivo: "Troca de tela", desde: "2024-01-15" },
  { rank: 2, deviceId: "TRM-056", posto: "Posto Norte 2", cliente: "Cliente 4", motivo: "Atualização de firmware", desde: "2024-01-18" },
];

// Terminals in transport
export const terminalsInTransport = [
  { rank: 1, deviceId: "TRM-067", posto: "Em trânsito para Cliente 13", origem: "Depósito Central", destino: "Posto Shopping", dataEnvio: "2024-01-20" },
  { rank: 2, deviceId: "TRM-089", posto: "Em trânsito para Cliente 14", origem: "Posto A", destino: "Posto B", dataEnvio: "2024-01-19" },
];

// Disconnection problems
export const disconnectionProblems = [
  { rank: 1, type: "Terminal", identificador: "MAC: 00:1A:2B:3C:4D:5E", posto: "Hospital Regional", horasOffline: 48 },
  { rank: 2, type: "Smart", identificador: "IMEI: 359123456789012", posto: "Posto Aeroporto", horasOffline: 36 },
  { rank: 3, type: "Terminal", identificador: "MAC: AA:BB:CC:DD:EE:FF", posto: "Posto Norte 2", horasOffline: 24 },
  { rank: 4, type: "Smart", identificador: "IMEI: 359987654321098", posto: "Condomínio Residencial", horasOffline: 12 },
];

// Idle Terminals (Terminais ociosos)
export const idleTerminals = [
  {
    tipo: "Smart",
    identificador: "IMEI: 359123456789012",
    posto: "Posto Leste SP",
    diasSemRegistro: 15
  },
  {
    tipo: "TBI",
    identificador: "MAC: 00:1A:2B:3C:4D:7G",
    posto: "Posto Oeste RJ",
    diasSemRegistro: 8
  },
  {
    tipo: "Smart",
    identificador: "IMEI: 359987654321098",
    posto: "Posto Centro MG",
    diasSemRegistro: 22
  },
  {
    tipo: "TBI",
    identificador: "MAC: 00:1A:2B:3C:4D:8H",
    posto: "Posto Industrial SP",
    diasSemRegistro: 5
  }
];

// Displaced Terminals (Terminais deslocados)
export const displacedTerminals = [
  { 
    tipo: "Smart", 
    identificador: "IMEI: 123456789012345", 
    posto: "Condomínio Residencial", 
    geolocalizacaoPosto: "-23.5200, -46.6180",
    geolocalizacaoTerminal: "-23.5350, -46.6450"
  },
  { 
    tipo: "TBI", 
    identificador: "MAC: 00:1A:2B:3C:4D:5E", 
    posto: "Hospital Regional", 
    geolocalizacaoPosto: "-23.5800, -46.6500",
    geolocalizacaoTerminal: "-23.5650, -46.6100"
  },
  { 
    tipo: "Smart", 
    identificador: "IMEI: 987654321098765", 
    posto: "Universidade", 
    geolocalizacaoPosto: "-23.5505, -46.5800",
    geolocalizacaoTerminal: "-23.5420, -46.6280"
  },
  { 
    tipo: "TBI", 
    identificador: "MAC: AA:BB:CC:DD:EE:FF", 
    posto: "Fábrica", 
    geolocalizacaoPosto: "-23.5505, -46.6900",
    geolocalizacaoTerminal: "-23.5260, -46.6370"
  },
];

// Devices in Maintenance (Lista de dispositivos em manutenção)
export const devicesInMaintenance = [
  { tipo: "Tablet", identificador: "IMEI: 123456789012345", status: "Manutenção", defeito: "Display" },
  { tipo: "Tablet", identificador: "IMEI: 987654321098765", status: "Transporte", defeito: "Bateria" },
  { tipo: "TBI", identificador: "MAC: 00:1A:2B:3C:4D:5E", status: "Manutenção", defeito: "Fingerprint" },
  { tipo: "TBI", identificador: "MAC: AA:BB:CC:DD:EE:FF", status: "Transporte", defeito: "Display" },
  { tipo: "Tablet", identificador: "IMEI: 456789123456789", status: "Manutenção", defeito: "Fingerprint" },
  { tipo: "TBI", identificador: "MAC: 11:22:33:44:55:66", status: "Manutenção", defeito: "Bateria" },
  { tipo: "Tablet", identificador: "IMEI: 654321987654321", status: "Transporte", defeito: "Display" },
];

// Maintenance Evolution (Evolução das Manutenções)
export const maintenanceEvolution = [
  { mes: "Jan", tbi: 5, smart: 8 },
  { mes: "Fev", tbi: 7, smart: 6 },
  { mes: "Mar", tbi: 4, smart: 9 },
  { mes: "Abr", tbi: 6, smart: 7 },
  { mes: "Mai", tbi: 8, smart: 10 },
  { mes: "Jun", tbi: 5, smart: 8 },
];

// Top Defects (Top Defeitos)
export const topDefects = [
  { defeito: "Display", quantidade: 3, percentual: 43 },
  { defeito: "Fingerprint", quantidade: 2, percentual: 29 },
  { defeito: "Bateria", quantidade: 2, percentual: 28 },
];

// Terminals without Post Link (Terminais sem vínculo em postos)
export const terminalsWithoutPostLink = [
  { tipo: "Smart", identificador: "IMEI: 111222333444555" },
  { tipo: "TBI", identificador: "MAC: FF:EE:DD:CC:BB:AA" },
  { tipo: "Smart", identificador: "IMEI: 555444333222111" },
  { tipo: "TBI", identificador: "MAC: 12:34:56:78:90:AB" },
  { tipo: "Smart", identificador: "IMEI: 999888777666555" },
];
