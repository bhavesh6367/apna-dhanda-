"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { GoogleIcon, FacebookIcon } from '@/components/ui/social-icons';
import { useAuth } from '@/context/auth-context';
import { useShop } from '@/context/shop-context';

interface AuthGatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'login' | 'register';
  setMode: (mode: 'login' | 'register') => void;
}

const PasswordStrengthBar = ({ password }: { password: string }) => {
  const [strength, setStrength] = useState(0);
  
  useEffect(() => {
    let s = 0;
    if (password.length > 5) s += 1;
    if (password.length >= 8) s += 1;
    if (/[0-9]/.test(password)) s += 1;
    if (/[A-Z]/.test(password)) s += 1;
    if (/[^A-Za-z0-9]/.test(password)) s += 1;
    setStrength(s);
  }, [password]);

  const colors = ['bg-muted', 'bg-destructive', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-primary'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Secure'];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={`flex-1 transition-colors duration-500 ${strength >= i ? colors[strength] : 'bg-muted'}`}
          />
        ))}
      </div>
      {password && (
        <p className={`text-[9px] font-space tracking-widest uppercase ${strength >= 4 ? 'text-primary' : strength >= 2 ? 'text-yellow-500' : 'text-destructive'}`}>
          Strength: {labels[strength]}
        </p>
      )}
    </div>
  );
};

export const AuthGatePopup = ({
  isOpen,
  onClose,
  onSuccess,
  mode,
  setMode,
}: AuthGatePopupProps) => {
  const { login, register } = useAuth();
  const { addNotification } = useShop();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '',
    agreed: false 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(loginForm);
      addNotification("Welcome back to the Grid.", "success");
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.agreed) {
      setError("Please agree to our terms and conditions.");
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await register({
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        password: registerForm.password
      });
      addNotification("Account created. Welcome to Offgrids.", "success");
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock social logins for UI demo
  const handleSocialLogin = () => {
    addNotification("Social login integration coming soon.", "info");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-md bg-[#0F0F0F] border border-[#2A2A2A] relative overflow-hidden"
          >
            {/* Accent top bar */}
            <div className="h-[3px] w-full bg-[#E8FF00]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#888] hover:text-[#F5F0E8] transition-colors duration-200 z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#E8FF00] px-2 py-0.5">
                    <span className="font-black text-black text-sm">OFF</span>
                  </div>
                  <span className="font-bebas text-white text-xl tracking-[0.3em]">
                    GRIDS
                  </span>
                </div>

                <h2 className="font-bebas text-3xl text-[#F5F0E8] tracking-widest mb-2">
                  {mode === 'login' ? 'WELCOME BACK.' : 'JOIN THE GRID.'}
                </h2>
                <p className="text-[#888] text-[11px] font-space tracking-widest uppercase">
                  {mode === 'login'
                    ? 'Login to place your order and track deliveries.'
                    : 'Create an account to complete your purchase.'
                  }
                </p>
                <div className="w-10 h-[2px] bg-[#E8FF00] mt-3" />
              </div>

              {/* Tab switcher */}
              <div className="flex border border-[#2A2A2A] mb-8">
                {['login', 'register'].map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m as any); setError(''); }}
                    className={`
                      flex-1 py-3
                      font-bebas text-sm tracking-widest
                      transition-all duration-200
                      ${mode === m
                        ? 'bg-[#E8FF00] text-black'
                        : 'text-[#888] hover:text-[#F5F0E8]'
                      }
                    `}
                  >
                    {m === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {mode === 'login' ? (
                  <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.2em] text-muted-foreground uppercase">EMAIL</label>
                      <div className="relative group">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] group-focus-within:border-primary pl-10 pr-4 py-3 text-sm font-space tracking-wide outline-none transition-all"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-space tracking-[0.2em] text-muted-foreground uppercase">PASSWORD</label>
                        <button type="button" className="text-[9px] font-space tracking-widest text-primary uppercase hover:underline">Forgot?</button>
                      </div>
                      <div className="relative group">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] group-focus-within:border-primary pl-10 pr-12 py-3 text-sm font-space tracking-wide outline-none transition-all"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#F5F0E8] transition-colors"
                        >
                          {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] px-4 py-3 font-space tracking-widest uppercase"
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 mt-2 bg-[#E8FF00] text-black font-bebas text-lg tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_4px_30px_#E8FF0022] transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <><Loader2 size={18} className="animate-spin" /> LOGGING IN...</>
                      ) : 'LOGIN & CONTINUE →'}
                    </button>

                    <div className="flex items-center gap-3 my-2">
                      <div className="flex-1 h-px bg-[#2A2A2A]" />
                      <span className="text-[#444] text-[10px] font-space tracking-widest">OR</span>
                      <div className="flex-1 h-px bg-[#2A2A2A]" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleSocialLogin}
                        className="flex items-center justify-center gap-3 py-3 border border-[#2A2A2A] text-[#F5F0E8] text-[10px] font-space tracking-widest uppercase hover:border-[#E8FF00] transition-colors"
                      >
                        <GoogleIcon size={16} /> Google
                      </button>
                      <button
                        type="button"
                        onClick={handleSocialLogin}
                        className="flex items-center justify-center gap-3 py-3 border border-[#2A2A2A] text-[#F5F0E8] text-[10px] font-space tracking-widest uppercase hover:border-[#E8FF00] transition-colors"
                      >
                        <FacebookIcon size={16} /> Facebook
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.2em] text-muted-foreground uppercase">FULL NAME</label>
                      <div className="relative group">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          placeholder="Bhavesh Verma"
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] group-focus-within:border-primary pl-10 pr-4 py-3 text-sm font-space tracking-wide outline-none transition-all"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          required
                          minLength={2}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.2em] text-muted-foreground uppercase">
                        MOBILE NUMBER <span className="text-primary">*</span>
                      </label>
                      <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] text-[11px] font-space tracking-widest">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] group-focus-within:border-primary pl-16 pr-4 py-3 text-sm font-space tracking-wide outline-none transition-all"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value.replace(/\D/g, '')})}
                          maxLength={10}
                          pattern="^[6-9]\d{9}$"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.2em] text-muted-foreground uppercase">EMAIL ADDRESS</label>
                      <div className="relative group">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] group-focus-within:border-primary pl-10 pr-4 py-3 text-sm font-space tracking-wide outline-none transition-all"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-space tracking-[0.2em] text-muted-foreground uppercase">PASSWORD</label>
                      <div className="relative group">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Min 8 chars, 1 number"
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] group-focus-within:border-primary pl-10 pr-12 py-3 text-sm font-space tracking-wide outline-none transition-all"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                          minLength={8}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#F5F0E8] transition-colors"
                        >
                          {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>
                      <PasswordStrengthBar password={registerForm.password} />
                    </div>

                    <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="mt-1 accent-primary bg-[#1A1A1A] border-[#2A2A2A] rounded-none focus:ring-0" 
                        required 
                        checked={registerForm.agreed}
                        onChange={(e) => setRegisterForm({...registerForm, agreed: e.target.checked})}
                      />
                      <span className="text-[10px] font-space text-[#888] tracking-widest uppercase leading-relaxed group-hover:text-[#AAA] transition-colors">
                        I agree to Offgrids' <span className="text-primary underline px-1">Terms</span> and <span className="text-primary underline pl-1">Privacy Policy</span>
                      </span>
                    </label>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] px-4 py-3 font-space tracking-widest uppercase"
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 mt-2 bg-[#E8FF00] text-black font-bebas text-lg tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_4px_30px_#E8FF0022] transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <><Loader2 size={18} className="animate-spin" /> JOINING THE GRID...</>
                      ) : 'CREATE ACCOUNT & CONTINUE →'}
                    </button>
                  </form>
                )}
              </div>

              <p className="text-[#444] text-[9px] font-space tracking-[0.3em] uppercase text-center mt-6">
                * Mobile number required for secure delivery
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
