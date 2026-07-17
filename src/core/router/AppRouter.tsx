import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { WelcomeOnboarding } from '@/features/auth/components/WelcomeOnboarding';

import { AIInvestmentWarRoom } from '@/features/war-room/components/AIInvestmentWarRoom';

import { AppShell } from '@/core/layout/AppShell';
import { InvestmentCommandCenter } from '@/features/command-center/components/InvestmentCommandCenter';

import { PortfolioOS } from '@/features/portfolio/components/PortfolioOS';
import { CompanyResearchPage } from '@/features/research/components/CompanyResearchPage';

// Temporary placeholder components
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-surface">
    <h1 className="text-4xl font-bold mb-4">RLIP PRO</h1>
    <Link to="/login" className="px-6 py-2 bg-primary text-white rounded">Đăng nhập</Link>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <div className="flex items-center justify-center min-h-screen bg-background">
                <AuthForm />
              </div>
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <WelcomeOnboarding />
            </ProtectedRoute>
          } 
        />

        {/* Private Shell Routes */}
        <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
          <Route path="/dashboard" element={<InvestmentCommandCenter />} />
          <Route path="/war-room" element={<AIInvestmentWarRoom />} />
          <Route path="/portfolio" element={<PortfolioOS />} />
          <Route path="/research" element={<CompanyResearchPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
