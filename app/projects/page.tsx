/**
 * Projects List Page
 * Where I showcase the pain and suffering... I mean, accomplishments
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string;
  category: string;
  featured: boolean;
  imageUrl: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch projects:', error);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            A collection of things I&apos;ve built, broken, fixed, and eventually shipped. 
            Each one a testament to the power of Stack Overflow and sheer stubbornness.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === category
                  ? 'bg-linear-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const techStack = JSON.parse(project.techStack);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card glow={project.featured}>
                    {project.featured && (
                      <Badge variant="warning" className="mb-4">⭐ Featured</Badge>
                    )}
                    <div className="aspect-video bg-linear-to-br from-cyan-900/20 to-purple-900/20 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {techStack.slice(0, 3).map((tech: string) => (
                        <Badge key={tech} variant="primary">
                          {tech}
                        </Badge>
                      ))}
                      {techStack.length > 3 && (
                        <Badge variant="default">+{techStack.length - 3}</Badge>
                      )}
                    </div>
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="ghost" className="w-full">
                        View Details →
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">
              No projects found in this category. 
              <br />
              Maybe I should build something? 🤔
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
