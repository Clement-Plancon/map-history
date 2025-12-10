import { Navigate, Route, Routes } from 'react-router-dom';
import GameScreen from './routes/GameScreen';
import PresetsScreen from './routes/PresetsScreen';
import FlagsScreen from './routes/FlagsScreen';
import CommunityScreen from './routes/CommunityScreen';
import MainLayout from './components/Layout/MainLayout';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/presets" element={<PresetsScreen />} />
        <Route path="/flags" element={<FlagsScreen />} />
        <Route path="/community" element={<CommunityScreen />} />
      </Route>
    </Routes>
  );
};

export default App;
