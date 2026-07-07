import { Suspense, lazy } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ProgressPage } from './pages/ProgressPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SourcesPage } from './pages/SourcesPage';
import { MethodPage } from './pages/MethodPage';
import { DEFAULT_SCENE_ID } from './data/scenes';

// The 3D observer (three.js and scene code) loads lazily so the study pages stay light.
const ObservePage = lazy(() => import('./pages/ObservePage'));

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/observe" element={<Navigate to={`/observe/${DEFAULT_SCENE_ID}`} replace />} />
        <Route
          path="/observe/:sceneId"
          element={
            <Suspense fallback={<div className="page-loading">Loading the observer…</div>}>
              <ObservePage />
            </Suspense>
          }
        />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/method" element={<MethodPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
