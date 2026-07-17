import { AppRouter } from '@/core/router/AppRouter';
import { AuthProvider } from '@/core/auth/AuthContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;
