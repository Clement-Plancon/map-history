export type Era =
  | 'Medieval'
  | 'Renaissance'
  | 'Age of Discovery'
  | 'Industrial'
  | 'WW1'
  | 'Interwar'
  | 'WW2'
  | 'Cold War'
  | 'Modern Day'
  | 'Future'
  | 'Fantasy';

export type PresetCategory =
  | 'Historical'
  | 'AltHistorical'
  | 'HistoricalFiction'
  | 'ScienceFiction'
  | 'Fantasy'
  | 'CreatorTemplates';

export type GameStats = {
  stability: number;
  economy: number;
  military: number;
  diplomacy: number;
  legitimacy: number;
};

export type Faction = {
  id: string;
  name: string;
  color: string;
  description: string;
  relations: number;
};

export type GameChoice = {
  id: string;
  label: string;
  description: string;
  statChanges: Partial<GameStats>;
  factionRelations?: Record<string, number>;
  logText: string;
};

export type GameEvent = {
  id: string;
  title: string;
  flavorText: string;
  turnMin?: number;
  turnMax?: number;
  tags: string[];
  choices: GameChoice[];
};

export type Scenario = {
  id: string;
  title: string;
  era: Era;
  category: PresetCategory;
  yearStart: number;
  region: string;
  description: string;
  tags: string[];
  initialStats: GameStats;
  factions: Faction[];
  eventDeck: GameEvent[];
  turnLimit: number;
};

export type GameLogEntry = {
  id: string;
  turn: number;
  eventTitle: string;
  choiceLabel: string;
  summary: string;
  delta: Partial<GameStats>;
};

export type GameState = {
  scenario: Scenario;
  currentTurn: number;
  year: number;
  stats: GameStats;
  log: GameLogEntry[];
  isGameOver: boolean;
  endingSummary?: string;
};
