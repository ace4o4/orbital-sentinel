import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-glass-border">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-void-deep to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Security Status */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 text-cyan">
              <Lock className="w-4 h-4" />
              <span className="font-mono text-xs tracking-wider">
                SECURE CONNECTION ESTABLISHED
              </span>
            </div>
            <div className="hidden md:block h-4 w-px bg-glass-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="font-mono text-xs tracking-wider">
                TLS 1.3 ENCRYPTED
              </span>
            </div>
          </motion.div>

          {/* Version */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="font-mono text-xs text-muted-foreground tracking-wider">
              ORBITAL SENTINEL
            </span>
            <div className="px-2 py-1 rounded bg-cyan/10 border border-cyan/20">
              <span className="font-mono text-xs text-cyan">V1.0.0</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-mono text-xs text-muted-foreground">
              © 2024 ORBITAL SENTINEL. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="font-mono text-xs text-muted-foreground hover:text-cyan transition-colors">
                PRIVACY POLICY
              </a>
              <a href="#" className="font-mono text-xs text-muted-foreground hover:text-cyan transition-colors">
                TERMS OF SERVICE
              </a>
              <a href="#" className="font-mono text-xs text-muted-foreground hover:text-cyan transition-colors">
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
