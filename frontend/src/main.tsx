//import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from './auth/signin';
import DashboardPage from './Pages/Dashboard';
import { ClerkProvider } from '@clerk/clerk-react'
import HomePage from './Pages/Home';
import EditResume from './Pages/Dashboard/resume/[resumeId]/edit';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<App />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/resume/:resumeId/edit" element={<EditResume />} />
        </Route>
        <Route path="/auth/signin" element={<SignInPage />} />
      </Routes>
    </ClerkProvider>
  </BrowserRouter>
);