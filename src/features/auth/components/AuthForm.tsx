import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Card } from '@/shared/components/Card';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
});

const registerSchema = loginSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

type AuthMode = 'login' | 'register' | 'forgot-password';

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await authService.loginWithEmail(data.email, data.password);
      toast.success('Đăng nhập thành công!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await authService.registerWithEmail(data.email, data.password);
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      await authService.loginWithGoogle();
      toast.success('Đăng nhập Google thành công!');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onResetPassword = async (data: any) => {
    setLoading(true);
    try {
      await authService.resetPassword(data.email);
      toast.success('Email khôi phục đã được gửi!');
      setMode('login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-surface shadow-lg rounded-xl">
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          className={`pb-2 ${mode === 'login' ? 'border-b-2 border-primary font-bold' : 'text-gray-500'}`}
          onClick={() => setMode('login')}
        >
          Đăng nhập
        </button>
        <button
          className={`pb-2 ${mode === 'register' ? 'border-b-2 border-primary font-bold' : 'text-gray-500'}`}
          onClick={() => setMode('register')}
        >
          Đăng ký
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleLoginSubmit(onLogin)} className="flex flex-col gap-4">
              <div>
                <Input {...registerLogin('email')} placeholder="Email" type="email" className="w-full p-2 border rounded" />
                {loginErrors.email && <span className="text-danger text-sm">{loginErrors.email.message}</span>}
              </div>
              <div>
                <Input {...registerLogin('password')} placeholder="Mật khẩu" type="password" className="w-full p-2 border rounded" />
                {loginErrors.password && <span className="text-danger text-sm">{loginErrors.password.message}</span>}
              </div>
              <button type="button" onClick={() => setMode('forgot-password')} className="text-sm text-primary text-right">
                Quên mật khẩu?
              </button>
              <Button type="submit" disabled={loading} variant="primary" className="w-full py-2 bg-primary text-white rounded">
                {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
              </Button>
            </form>
          </motion.div>
        )}

        {mode === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSignupSubmit(onRegister)} className="flex flex-col gap-4">
              <div>
                <Input {...registerSignup('email')} placeholder="Email" type="email" className="w-full p-2 border rounded" />
                {signupErrors.email && <span className="text-danger text-sm">{signupErrors.email.message}</span>}
              </div>
              <div>
                <Input {...registerSignup('password')} placeholder="Mật khẩu" type="password" className="w-full p-2 border rounded" />
                {signupErrors.password && <span className="text-danger text-sm">{signupErrors.password.message}</span>}
              </div>
              <div>
                <Input {...registerSignup('confirmPassword')} placeholder="Xác nhận mật khẩu" type="password" className="w-full p-2 border rounded" />
                {signupErrors.confirmPassword && <span className="text-danger text-sm">{signupErrors.confirmPassword.message}</span>}
              </div>
              <Button type="submit" disabled={loading} variant="primary" className="w-full py-2 bg-primary text-white rounded">
                {loading ? 'Đang xử lý...' : 'Tạo Tài Khoản'}
              </Button>
            </form>
          </motion.div>
        )}

        {mode === 'forgot-password' && (
          <motion.div
            key="forgot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleLoginSubmit(onResetPassword)} className="flex flex-col gap-4">
              <p className="text-sm text-gray-500">Nhập email để nhận liên kết khôi phục mật khẩu.</p>
              <div>
                <Input {...registerLogin('email')} placeholder="Email" type="email" className="w-full p-2 border rounded" />
                {loginErrors.email && <span className="text-danger text-sm">{loginErrors.email.message}</span>}
              </div>
              <Button type="submit" disabled={loading} variant="primary" className="w-full py-2 bg-primary text-white rounded">
                {loading ? 'Đang gửi...' : 'Gửi Email'}
              </Button>
              <button type="button" onClick={() => setMode('login')} className="text-sm text-center text-gray-500 mt-2">
                Quay lại đăng nhập
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-gray-500">Hoặc tiếp tục với</span>
          </div>
        </div>
        <Button onClick={onGoogleLogin} variant="secondary" className="w-full mt-4 py-2 flex items-center justify-center gap-2 border rounded">
          Google
        </Button>
      </div>
    </Card>
  );
};
