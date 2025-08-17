import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Documents from './pages/Documents';
import MindMaps from './pages/MindMaps';
import ExamPrep from './pages/ExamPrep';
import StudyBuddy from './pages/StudyBuddy';
import Community from './pages/Community';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/mindmaps" element={<MindMaps />} />
              <Route path="/exam-prep" element={<ExamPrep />} />
              <Route path="/study-buddy" element={<StudyBuddy />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </Layout>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #475569'
              }
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;