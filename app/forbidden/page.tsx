/**
 * 403 Forbidden Page
 * For when you try to sneak into the admin panel like a digital ninja
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLock, FaHome, FaSignInAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';

export default function ForbiddenPage() {
  // Generate random positions once on mount
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      x2: Math.random() * 100,
      y1: Math.random() * 100,
      y2: Math.random() * 100,
      duration: Math.random() * 10 + 10,
    }))
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 bg-cyan-500 rounded-full opacity-20"
            style={{
              left: `${p.x1}%`,
              top: `${p.y1}%`,
            }}
            animate={{
              x: [`0%`, `${p.x2 - p.x1}vw`],
              y: [`0%`, `${p.y2 - p.y1}vh`],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Lock icon with glow */}
          <motion.div
            className="inline-block mb-8"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-50"></div>
              <FaLock className="text-9xl text-cyan-500 relative" />
            </div>
          </motion.div>

          {/* Error code */}
          <motion.h1 
            className="text-8xl md:text-9xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            403
          </motion.h1>

          {/* Title */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Access Denied, Buddy
          </motion.h2>

          {/* Sarcastic message */}
          <motion.p 
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Nice try, but this area is for authorized personnel only. 
            <br />
            You know, the people who actually have admin credentials.
          </motion.p>

          {/* Additional info */}
          <motion.div 
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-300 text-sm">
              If you think you should have access to this page:
            </p>
            <ul className="text-left text-gray-400 text-sm mt-3 space-y-2">
              <li>✓ Make sure you&apos;re logged in</li>
              <li>✓ Check if you have admin privileges</li>
              <li>✓ Try not to hack the mainframe</li>
              <li>✓ Accept that some doors stay closed</li>
            </ul>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/">
              <Button variant="primary" size="lg">
                <FaHome className="mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="secondary" size="lg">
                <FaSignInAlt className="mr-2" />
                Admin Login
              </Button>
            </Link>
          </motion.div>

          {/* Fun fact */}
          <motion.p 
            className="text-gray-500 text-sm mt-12 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Fun fact: This page was designed while being locked out of my own server. 
            <br />
            Irony is a beautiful thing.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
