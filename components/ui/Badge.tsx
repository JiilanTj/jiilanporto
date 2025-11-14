/**
 * Badge Component
 * For tech stacks, tags, and flexing what frameworks you know
 */

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    primary: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    success: 'bg-green-500/10 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
