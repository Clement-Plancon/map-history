import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScenarioSelector from '../components/game/ScenarioSelector';
import GameHUD from '../components/game/GameHUD';
import StatsPanel from '../components/game/StatsPanel';
import TurnActions from '../components/game/TurnActions';
import EventLog from '../components/game/EventLog';
import { useGameEngine } from '../hooks/useGameEngine';
import { Scenario } from '../types';
import scenarios from '../data/scenarios';

const GameScreen = () => {
  const { state } = useLocation();
  const { gameState, currentEvent, startNewGame, advanceTurn, pendingScenario, clearSave } = useGameEngine();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(pendingScenario ?? scenarios[0]);

  useEffect(() => {
    if (pendingScenario) {
      setSelectedScenario(pendingScenario);
    }
  }, [pendingScenario]);

  useEffect(() => {
    if (state?.scenarioId) {
      const match = scenarios.find((s) => s.id === state.scenarioId);
      if (match) {
        setSelectedScenario(match);
      }
    }
  }, [state]);

  const activeFactions = useMemo(() => selectedScenario?.factions ?? [], [selectedScenario]);

  return (
    <div className="space-y-4">
      <ScenarioSelector
        selectedId={selectedScenario?.id ?? null}
        onSelect={(scenario) => setSelectedScenario(scenario)}
        onStart={() => selectedScenario && startNewGame(selectedScenario)}
        onContinue={gameState ? undefined : () => pendingScenario && startNewGame(pendingScenario)}
        hasSave={!!gameState}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <GameHUD gameState={gameState} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsPanel gameState={gameState} />
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Factions</p>
              <h3 className="text-lg font-semibold">Power Map</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {activeFactions.map((faction) => (
                  <div
                    key={faction.id}
                    className="border border-slate-800 rounded-lg p-3 bg-slate-800/40 flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: faction.color }} />
                      <p className="text-sm text-white font-semibold">{faction.name}</p>
                    </div>
                    <p className="text-xs text-slate-300">{faction.description}</p>
                    <p className="text-[11px] text-pax-muted">Relations: {faction.relations}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => clearSave()}
                className="mt-3 text-xs text-rose-300 hover:text-rose-200"
                disabled={!gameState}
              >
                Clear save
              </button>
            </div>
          </div>
          <TurnActions currentEvent={currentEvent} onChoose={advanceTurn} gameState={gameState} />
        </div>
        <EventLog log={gameState?.log ?? []} />
      </div>
    </div>
  );
};

export default GameScreen;
