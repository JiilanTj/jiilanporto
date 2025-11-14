/**
 * Button Component
 * The one component that gets reused everywhere because consistency is king
 */

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-linear-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50',
    secondary: 'bg-gray-800 text-cyan-400 border-2 border-cyan-500/30 hover:border-cyan-500 hover:bg-gray-700',
    ghost: 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
