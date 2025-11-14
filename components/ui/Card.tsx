/**
 * Card Component
 * Because every modern website needs cards with hover effects and gradients
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  const baseStyles = 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6';
  const glowStyles = glow ? 'shadow-lg shadow-cyan-500/10' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, borderColor: '#06b6d4' } : {}}
      className={`${baseStyles} ${glowStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
