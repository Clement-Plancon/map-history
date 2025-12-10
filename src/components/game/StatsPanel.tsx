import { GameState } from '../../types';

interface Props {
  gameState: GameState | null;
}

const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex justify-between text-xs text-slate-300 mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
);

const StatsPanel = ({ gameState }: Props) => {
  const stats = gameState?.stats ?? {
    stability: 0,
    economy: 0,
    military: 0,
    diplomacy: 0,
    legitimacy: 0
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">State pillars</p>
      <h3 className="text-lg font-semibold">Nation Stats</h3>
      <div className="space-y-3">
        <StatBar label="Stability" value={stats.stability} color="#22c55e" />
        <StatBar label="Economy" value={stats.economy} color="#fbbf24" />
        <StatBar label="Military" value={stats.military} color="#f97316" />
        <StatBar label="Diplomacy" value={stats.diplomacy} color="#60a5fa" />
        <StatBar label="Legitimacy" value={stats.legitimacy} color="#a855f7" />
      </div>
    </div>
  );
};

export default StatsPanel;
