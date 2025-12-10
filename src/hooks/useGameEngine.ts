import { useEffect, useMemo, useState } from 'react';
import { GameChoice, GameEvent, GameLogEntry, GameState, Scenario, GameStats } from '../types';
import MAP_REGIONS from '../data/mapRegions';

const STORAGE_KEY = 'paxSandbox_save';

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const applyChanges = (stats: GameStats, delta: Partial<GameStats>): GameStats => ({
  stability: clamp(stats.stability + (delta.stability ?? 0)),
  economy: clamp(stats.economy + (delta.economy ?? 0)),
  military: clamp(stats.military + (delta.military ?? 0)),
  diplomacy: clamp(stats.diplomacy + (delta.diplomacy ?? 0)),
  legitimacy: clamp(stats.legitimacy + (delta.legitimacy ?? 0))
});

const pickEvent = (scenario: Scenario, turn: number): GameEvent | undefined => {
  const pool = scenario.eventDeck.filter((event) => {
    const minOk = event.turnMin === undefined || event.turnMin <= turn;
    const maxOk = event.turnMax === undefined || event.turnMax >= turn;
    return minOk && maxOk;
  });
  if (!pool.length) return undefined;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
};

const buildInitialRegions = (scenario: Scenario) => {
  const control: Record<string, string> = {};
  const factionIds = new Set(scenario.factions.map((f) => f.id));
  MAP_REGIONS.forEach((region) => {
    if (region.defaultFactionId && factionIds.has(region.defaultFactionId)) {
      control[region.id] = region.defaultFactionId;
    }
  });
  return control;
};

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [pendingScenario, setPendingScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        const withRegions = parsed.regionsControl
          ? parsed
          : { ...parsed, regionsControl: buildInitialRegions(parsed.scenario) };
        setGameState(withRegions);
        const event = pickEvent(withRegions.scenario, withRegions.currentTurn);
        setCurrentEvent(event ?? withRegions.scenario.eventDeck[0]);
        setPendingScenario(withRegions.scenario);
      } catch (err) {
        console.error('Failed to parse save', err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const startNewGame = (scenario: Scenario) => {
    const event = pickEvent(scenario, 1) ?? scenario.eventDeck[0];
    const initialState: GameState = {
      scenario,
      currentTurn: 1,
      year: scenario.yearStart,
      stats: { ...scenario.initialStats },
      log: [],
      isGameOver: false,
      regionsControl: buildInitialRegions(scenario)
    };
    setPendingScenario(scenario);
    setGameState(initialState);
    setCurrentEvent(event);
  };

  const getCurrentEvent = useMemo(() => currentEvent, [currentEvent]);

  const advanceTurn = (choice: GameChoice) => {
    if (!gameState || !currentEvent || gameState.isGameOver) return;

    const updatedStats = applyChanges(gameState.stats, choice.statChanges);

    const logEntry: GameLogEntry = {
      id: `${gameState.currentTurn}-${choice.id}`,
      turn: gameState.currentTurn,
      eventTitle: currentEvent.title,
      choiceLabel: choice.label,
      summary: choice.logText,
      delta: choice.statChanges
    };

    const nextTurn = gameState.currentTurn + 1;
    const nextYear = gameState.year + 1;

    const loss = Object.values(updatedStats).some((value) => value <= 0);
    const reachedLimit = nextTurn > gameState.scenario.turnLimit;

    let endingSummary: string | undefined;
    if (loss) {
      endingSummary = 'A vital pillar collapsed; the regime could not endure.';
    } else if (reachedLimit) {
      endingSummary = 'The era closes peacefully, your legacy sealed by the choices made.';
    }

    const nextState: GameState = {
      ...gameState,
      currentTurn: nextTurn,
      year: nextYear,
      stats: updatedStats,
      log: [...gameState.log, logEntry],
      isGameOver: !!endingSummary,
      endingSummary,
      regionsControl: gameState.regionsControl
    };

    const nextEvent = endingSummary ? null : pickEvent(gameState.scenario, nextTurn) ?? currentEvent;

    setGameState(nextState);
    setCurrentEvent(nextEvent);
  };

  const clearSave = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(null);
    setCurrentEvent(null);
    setPendingScenario(null);
  };

  const setRegionControl = (regionId: string, factionId: string | null) => {
    setGameState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev.regionsControl };
      if (factionId) {
        updated[regionId] = factionId;
      } else {
        delete updated[regionId];
      }
      const nextState = { ...prev, regionsControl: updated };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      return nextState;
    });
  };

  return {
    gameState,
    pendingScenario,
    currentEvent,
    startNewGame,
    advanceTurn,
    getCurrentEvent,
    clearSave,
    setPendingScenario,
    setRegionControl
  };
};
