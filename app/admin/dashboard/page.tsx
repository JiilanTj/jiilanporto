/**
 * Admin Dashboard
 * The command center for managing this beautiful chaos
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaCheckCircle, FaSignOutAlt, FaChartLine, 
  FaProjectDiagram, FaPlus, FaEdit, FaTrash, FaTimes 
} from 'react-icons/fa';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string;
  category: string;
  featured: boolean;
  imageUrl?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
  whatBroke?: string | null;
  screenshots?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  summary: Array<{ path: string; count: number }>;
}

type TabType = 'messages' | 'projects' | 'analytics';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    longDescription: '',
    techStack: '',
    category: 'Full-Stack',
    featured: false,
    imageUrl: '',
    demoUrl: '',
    repoUrl: '',
    whatBroke: '',
    screenshots: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesRes, projectsRes, statsRes] = await Promise.all([
          fetch('/api/admin/messages'),
          fetch('/api/projects'),
          fetch('/api/hit'),
        ]);

        if (!messagesRes.ok) {
          router.push('/forbidden');
          return;
        }

        const messagesData = await messagesRes.json();
        const projectsData = await projectsRes.json();
        const statsData = await statsRes.json();

        setMessages(messagesData);
        setProjects(projectsData);
        setStats(statsData);
      } catch {
        router.push('/forbidden');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const markAsRead = async (id: string, read: boolean) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read }),
      });

      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read } : msg))
      );
    } catch {
      alert('Failed to update message');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const techStackArray = formData.techStack.split(',').map(s => s.trim()).filter(Boolean);
      const screenshotsArray = formData.screenshots.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        ...formData,
        techStack: techStackArray,
        screenshots: screenshotsArray,
        imageUrl: formData.imageUrl || null,
        demoUrl: formData.demoUrl || null,
        repoUrl: formData.repoUrl || null,
        whatBroke: formData.whatBroke || null,
      };

      if (editingProject) {
        // Update existing
        const res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingProject.id }),
        });

        if (res.ok) {
          const updated = await res.json();
          setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
          alert('Project updated successfully!');
        } else {
          const error = await res.json();
          alert(error.error || 'Failed to update project');
        }
      } else {
        // Create new
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const newProject = await res.json();
          setProjects(prev => [newProject, ...prev]);
          alert('Project created successfully!');
        } else {
          const error = await res.json();
          alert(error.error || 'Failed to create project');
        }
      }

      // Reset form
      setShowProjectForm(false);
      setEditingProject(null);
      setFormData({
        slug: '',
        title: '',
        description: '',
        longDescription: '',
        techStack: '',
        category: 'Full-Stack',
        featured: false,
        imageUrl: '',
        demoUrl: '',
        repoUrl: '',
        whatBroke: '',
        screenshots: '',
      });
    } catch {
      alert('Something went wrong!');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      slug: project.slug,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      techStack: JSON.parse(project.techStack).join(', '),
      category: project.category,
      featured: project.featured,
      imageUrl: project.imageUrl || '',
      demoUrl: project.demoUrl || '',
      repoUrl: project.repoUrl || '',
      whatBroke: project.whatBroke || '',
      screenshots: project.screenshots ? JSON.parse(project.screenshots).join(', ') : '',
    });
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
        alert('Project deleted successfully!');
      } else {
        alert('Failed to delete project');
      }
    } catch {
      alert('Something went wrong!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Managing the chaos since 2024</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="ghost" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" /> Logout
            </Button>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card glow={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Messages</p>
                  <p className="text-3xl font-bold text-white">{messages.length}</p>
                </div>
                <FaEnvelope className="text-4xl text-cyan-400" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card glow={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Projects</p>
                  <p className="text-3xl font-bold text-purple-400">{projects.length}</p>
                </div>
                <FaProjectDiagram className="text-4xl text-purple-400" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glow={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Visits</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats?.total || 0}</p>
                </div>
                <FaChartLine className="text-4xl text-yellow-400" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          {(['messages', 'projects', 'analytics'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>


        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <Card>
                  <p className="text-gray-400 text-center py-8">
                    No messages yet. Guess nobody wants to hire you 😢
                  </p>
                </Card>
              ) : (
                messages.map((message) => (
                  <Card key={message.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                          {message.read ? (
                            <Badge variant="success">Read</Badge>
                          ) : (
                            <Badge variant="warning">New</Badge>
                          )}
                        </div>
                        <p className="text-cyan-400 text-sm mb-2">{message.email}</p>
                        {message.subject && (
                          <p className="text-gray-300 font-medium mb-2">
                            Subject: {message.subject}
                          </p>
                        )}
                        <p className="text-gray-400 mb-3">{message.message}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!message.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(message.id, true)}
                          >
                            <FaCheckCircle className="mr-1" /> Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
              >
                <FaPlus className="mr-2" /> Add New Project
              </Button>
            </div>

            {showProjectForm && (
              <Card className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Slug *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        required
                        disabled={!!editingProject}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Short Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Long Description *</label>
                    <textarea
                      value={formData.longDescription}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        placeholder="React, Node.js, MongoDB"
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        required
                      >
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Mobile">Mobile</option>
                        <option value="SaaS">SaaS</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Web3">Web3</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Image URL</label>
                      <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Demo URL</label>
                      <input
                        type="text"
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Repo URL</label>
                      <input
                        type="text"
                        value={formData.repoUrl}
                        onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">What Broke During Development</label>
                    <textarea
                      value={formData.whatBroke}
                      onChange={(e) => setFormData({ ...formData, whatBroke: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      rows={3}
                      placeholder="The sarcastic story of what went wrong..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Screenshots (comma-separated URLs)</label>
                    <input
                      type="text"
                      value={formData.screenshots}
                      onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                      placeholder="/images/project-1.jpg, /images/project-2.jpg"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-gray-300">Mark as Featured</label>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" variant="primary">
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowProjectForm(false);
                        setEditingProject(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="primary">{project.category}</Badge>
                        {project.featured && <Badge variant="success">Featured</Badge>}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEditProject(project)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteProject(project.id, project.title)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Page Views Analytics</h2>
            <Card>
              <div className="space-y-3">
                {stats.summary.slice(0, 15).map((item) => (
                  <div key={item.path} className="flex justify-between items-center">
                    <span className="text-gray-300">{item.path}</span>
                    <Badge variant="primary">{item.count} visits</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
