/**
 * 404 Not Found Page
 * For when you wander into the void of non-existent URLs
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGhost, FaHome, FaSearch } from 'react-icons/fa';
import Button from '@/components/ui/Button';

export default function NotFound() {
  // Generate random positions once on mount
  const [ghosts] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating ghosts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ghosts.map((ghost) => (
          <motion.div
            key={ghost.id}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${ghost.left}%`,
              top: `${ghost.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: ghost.duration,
              repeat: Infinity,
              delay: ghost.delay,
            }}
          >
            👻
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ghost icon */}
          <motion.div
            className="inline-block mb-8"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-50"></div>
              <FaGhost className="text-9xl text-purple-500 relative" />
            </div>
          </motion.div>

          {/* Error code */}
          <motion.h1 
            className="text-8xl md:text-9xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.h1>

          {/* Title */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Page Not Found
          </motion.h2>

          {/* Sarcastic message */}
          <motion.p 
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Congratulations! You&apos;ve discovered a page that doesn&apos;t exist.
            <br />
            It&apos;s like finding a unicorn, but way less magical.
          </motion.p>

          {/* Possible reasons */}
          <motion.div 
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-300 text-sm font-medium mb-3">
              🤔 How did you even get here?
            </p>
            <ul className="text-left text-gray-400 text-sm space-y-2">
              <li>• You typed the URL wrong (typos happen)</li>
              <li>• The page moved and forgot to leave a note</li>
              <li>• It never existed in the first place</li>
              <li>• Quantum fluctuations deleted it</li>
              <li>• The developer forgot to build this page</li>
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
                Back to Safety
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" size="lg">
                <FaSearch className="mr-2" />
                Browse Projects
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
            Error 404: Page not found. Developer&apos;s motivation also not found.
            <br />
            Coincidence? Probably.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
