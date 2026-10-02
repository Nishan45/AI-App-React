import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell/AppShell";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ClassLectures from "./pages/ClassLectures/ClassLectures";
import Modules from "./pages/Modules/Modules";
import LearningResources from "./pages/LearningResources/LearningResources";
import ChallengeZone from "./pages/ChallengeZone/ChallengeZone";
import ProjectsActivities from "./pages/ProjectsActivities/ProjectsActivities";
import MyProgress from "./pages/MyProgress/MyProgress";
import AILearningBuddy from "./pages/AILearningBuddy/AILearningBuddy";
import HelpSupport from "./pages/HelpSupport/HelpSupport";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/class-lectures" element={<ClassLectures />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/learning-resources" element={<LearningResources />} />
          <Route path="/challenge-zone" element={<ChallengeZone />} />
          <Route path="/projects-activities" element={<ProjectsActivities />} />
          <Route path="/my-progress" element={<MyProgress />} />
          <Route path="/ai-learning-buddy" element={<AILearningBuddy />} />
          <Route path="/help-support" element={<HelpSupport />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
