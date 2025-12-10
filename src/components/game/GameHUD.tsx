import { GameState } from '../../types';

interface Props {
  gameState: GameState | null;
}

const GameHUD = ({ gameState }: Props) => {
  if (!gameState) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-slate-300">
        <p className="text-sm">No game in progress. Choose a scenario to begin.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Now Playing</p>
          <h2 className="text-xl font-semibold">{gameState.scenario.title}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-300">Year {gameState.year}</p>
          <p className="text-xs text-slate-400">Turn {gameState.currentTurn}</p>
        </div>
      </div>
      {gameState.isGameOver ? (
        <div className="p-3 rounded-lg bg-rose-500/10 text-rose-200 border border-rose-500/30">
          <p className="font-semibold">Game Over</p>
          <p className="text-sm">{gameState.endingSummary}</p>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-200 border border-emerald-500/30">
          <p className="font-semibold">Simulation running</p>
          <p className="text-sm">Guide your path through decisions each turn.</p>
        </div>
      )}
    </div>
  );
};

export default GameHUD;
