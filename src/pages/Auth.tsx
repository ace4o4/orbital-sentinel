import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SparklesBackground from '@/components/SparklesBackground';

import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: isLogin ? "Access Granted" : "Account Created",
      description: "Redirecting to command center...",
    });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-void relative flex items-center justify-center overflow-hidden">
      {/* Sparkles Background */}
      <SparklesBackground particleCount={60} />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan/5 via-transparent to-transparent" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 hud-grid opacity-30" />

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/30 mb-4 glow-cyan-subtle">
            <Shield className="w-8 h-8 text-cyan" />
          </div>
          <h1 className="font-display text-2xl text-foreground tracking-widest">
            ORBITAL <span className="text-cyan">//</span> SENTINEL
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Secure Access Portal
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          className="glass-panel rounded-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 border-beam rounded-2xl" />
          
          {/* Security badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-cyan">
            <Fingerprint className="w-4 h-4" />
            <span className="font-mono text-xs">256-BIT</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 p-1 glass-panel rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md font-display text-sm tracking-wider transition-all ${
                isLogin 
                  ? 'bg-cyan/20 text-cyan' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md font-display text-sm tracking-wider transition-all ${
                !isLogin 
                  ? 'bg-cyan/20 text-cyan' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              REGISTER
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-void border-glass-border text-foreground placeholder:text-muted-foreground focus:border-cyan/50 transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-void border-glass-border text-foreground placeholder:text-muted-foreground focus:border-cyan/50 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12 bg-void border-glass-border text-foreground placeholder:text-muted-foreground focus:border-cyan/50 transition-colors"
                  required
                />
              </motion.div>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-cyan text-sm hover:underline font-mono"
                >
                  Forgot credentials?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-cyan hover:bg-cyan/90 text-void font-display text-lg tracking-wider glow-cyan-subtle"
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span>AUTHENTICATING</span>
                  <span className="font-mono">...</span>
                </motion.div>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? 'ACCESS SYSTEM' : 'CREATE ACCOUNT'}
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Security notice */}
          <div className="mt-6 pt-6 border-t border-glass-border">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <Shield className="w-4 h-4" />
              <span>Secured connection established</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6 text-muted-foreground text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>ORBITAL SENTINEL v1.0 • CLASSIFIED ACCESS</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
