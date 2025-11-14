/**
 * Project Detail Page
 * The full story of how this project nearly drove me insane
 */

'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string;
  category: string;
  featured: boolean;
  imageUrl: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  whatBroke: string | null;
  screenshots: string | null;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setProject(data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch project:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-xl h-96 animate-pulse" />
        </div>
      </main>
    );
  }

  if (!project) {
    notFound();
  }

  const techStack = JSON.parse(project.techStack);
  const screenshots = project.screenshots ? JSON.parse(project.screenshots) : [];

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <FaArrowLeft className="mr-2" /> Back to Projects
          </Button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {project.featured && (
            <Badge variant="warning" className="mb-4">⭐ Featured Project</Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{project.title}</h1>
          <p className="text-xl text-gray-400 mb-6">{project.description}</p>

          {/* Links */}
          <div className="flex gap-4 mb-8">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <FaExternalLinkAlt className="mr-2" /> Live Demo
                </Button>
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">
                  <FaGithub className="mr-2" /> Source Code
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <div className="aspect-video bg-linear-to-br from-cyan-900/20 to-purple-900/20 rounded-xl flex items-center justify-center">
            <span className="text-8xl">🚀</span>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech: string) => (
              <Badge key={tech} variant="primary" className="text-base px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
          </Card>
        </motion.div>

        {/* What Broke Section */}
        {project.whatBroke && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-12"
          >
            <Card glow={true}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3">💥</span>
                What Broke During Development
              </h2>
              <p className="text-gray-300 leading-relaxed italic">{project.whatBroke}</p>
            </Card>
          </motion.div>
        )}

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {screenshots.map((screenshot: string, index: number) => (
                <div
                  key={index}
                  className="aspect-video bg-linear-to-br from-cyan-900/20 to-purple-900/20 rounded-xl flex items-center justify-center"
                >
                  <span className="text-6xl">📸</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center pt-12 border-t border-gray-800"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Want to see more?</h3>
          <Link href="/projects">
            <Button size="lg">View All Projects</Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
