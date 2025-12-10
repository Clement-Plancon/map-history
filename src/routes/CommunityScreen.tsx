const CommunityScreen = () => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Community</p>
        <h2 className="text-xl font-semibold text-white">Future sharing hub</h2>
        <p className="text-sm text-slate-300 max-w-3xl">
          This client-only demo runs entirely in your browser. A full release would let players upload presets, share alt-history
          setups, or coordinate multiplayer sessions. For now, everything is local—no accounts, no networking, just quick sandbox
          storytelling.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
          <h3 className="text-lg font-semibold text-white">Planned features</h3>
          <ul className="text-sm text-slate-300 list-disc pl-4 space-y-1">
            <li>Preset workshop with uploads and rating</li>
            <li>Map painters and flag editors</li>
            <li>Co-op and versus hotseat modes</li>
          </ul>
        </div>
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
          <h3 className="text-lg font-semibold text-white">Current constraints</h3>
          <ul className="text-sm text-slate-300 list-disc pl-4 space-y-1">
            <li>No backend services or authentication</li>
            <li>Save files live in your browser storage</li>
            <li>Routes are single-page app friendly for Netlify</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;
