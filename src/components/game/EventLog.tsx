import { GameLogEntry, GameStats } from '../../types';

interface Props {
  log: GameLogEntry[];
}

const formatDelta = (delta: Partial<GameStats>) =>
  Object.entries(delta)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}+${value}`)
    .join(' | ');

const EventLog = ({ log }: Props) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Timeline</p>
          <h3 className="text-white font-semibold">Event Log</h3>
        </div>
        <span className="text-xs text-slate-400">{log.length} entries</span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar space-y-2">
        {log.length === 0 && <p className="text-sm text-slate-400">No turns resolved yet.</p>}
        {log
          .slice()
          .reverse()
          .map((entry) => (
            <div key={entry.id} className="border border-slate-800 rounded-lg p-3 bg-slate-800/40">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Turn {entry.turn}</span>
                <span>{entry.eventTitle}</span>
              </div>
              <p className="text-sm text-white">Choice: {entry.choiceLabel}</p>
              <p className="text-xs text-slate-300">{entry.summary}</p>
              <p className="text-[11px] text-pax-muted mt-1">Delta: {formatDelta(entry.delta)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventLog;
