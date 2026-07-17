import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './ProtectedRoute';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { AIInvestmentWarRoom } from '@/features/war-room/components/AIInvestmentWarRoom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MVP Public Demo Route */}
        <Route path="/" element={
          <div className="min-h-screen bg-background text-primary font-sans">
            <header className="p-4 border-b border-border bg-surface text-center">
              <h1 className="text-xl font-bold text-accent-blue">RLIP PRO 2.0 - AI Investment Research Platform</h1>
            </header>
            <main>
              <AIInvestmentWarRoom />
            </main>
          </div>
        } />
        
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

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
