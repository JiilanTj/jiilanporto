/**
 * Home Page
 * The digital embodiment of controlled chaos and sarcastic excellence
 */

'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FaReact, FaNode, FaPython, FaDocker, FaAws, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiRedis } from 'react-icons/si';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ContactForm from '@/components/ui/ContactForm';

// Dynamically import 3D component with SSR disabled (because Three.js and SSR are enemies)
const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-linear-to-br from-cyan-900/20 to-purple-900/20 animate-pulse" />
});

export default function Home() {
  const techStack = [
    { name: 'React', icon: FaReact, color: 'text-cyan-400' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-400' },
    { name: 'Node.js', icon: FaNode, color: 'text-green-400' },
    { name: 'Python', icon: FaPython, color: 'text-yellow-400' },
    { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-cyan-400' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-300' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
    { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
    { name: 'Docker', icon: FaDocker, color: 'text-blue-400' },
    { name: 'AWS', icon: FaAws, color: 'text-orange-400' },
    { name: 'Git', icon: FaGitAlt, color: 'text-orange-600' },
  ];

  const memes = [
    { text: "It works on my machine ¯\\_(ツ)_/¯", emoji: "🤷" },
    { text: "Console.log() is a lifestyle", emoji: "🪵" },
    { text: "Production? More like producti-oops", emoji: "💥" },
    { text: "Debugging = Removing bugs I added yesterday", emoji: "🐛" },
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="gradient-text">Jiilan Nashrulloh Tanjung</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-4xl font-semibold text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Full-Stack & Mobile Developer
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Depressed coder forced to code since 2016.
              <br />
              Turning caffeine into code and bugs into features.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Hire Me (If You Dare)
              </Button>
              <Link href="/projects">
                <Button variant="secondary" size="lg">
                  View Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-cyan-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-2xl font-bold text-white mb-4">The Professional Version</h3>
              <p className="text-gray-300 leading-relaxed">
                Senior full-stack developer with 8+ years of experience building scalable web and mobile applications. 
                Specializing in React, Next.js, Node.js, and cloud infrastructure. I turn complex problems into elegant 
                solutions, preferably with TypeScript and a strict ESLint config.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold text-white mb-4">The Honest Version</h3>
              <p className="text-gray-300 leading-relaxed">
                I&apos;ve been writing code since 2016 and somehow haven&apos;t quit yet. My debugging process consists of 
                strategic console.logs, existential crises, and occasional victories. I build things that work, 
                break them, fix them again, and call it &quot;iterative development.&quot;
              </p>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Technical Arsenal Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Technical Arsenal</h2>
          <p className="text-gray-400 mb-12 text-lg">
            Technologies I use to build things (and occasionally break production)
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card hover={true} glow={true}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <Icon className={`text-5xl ${tech.color}`} />
                      <span className="text-white font-medium">{tech.name}</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Featured Projects</h2>
            <Link href="/projects">
              <Button variant="ghost">View All →</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} glow={true}>
                <div className="aspect-video bg-linear-to-br from-cyan-900/20 to-purple-900/20 rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Project Title {i}</h3>
                <p className="text-gray-400 mb-4">
                  A brief sarcastic description of what this project does and why it was painful to build.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary">Next.js</Badge>
                  <Badge variant="primary">TypeScript</Badge>
                  <Badge variant="primary">Prisma</Badge>
                </div>
                <Link href={`/projects/project-${i}`}>
                  <Button variant="ghost" className="w-full">View Details →</Button>
                </Link>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Meme Zone Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Developer Wisdom</h2>
          <p className="text-gray-400 mb-12 text-lg">
            Truths every developer knows but pretends they don&apos;t
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {memes.map((meme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <div className="flex items-center space-x-4">
                    <span className="text-5xl">{meme.emoji}</span>
                    <p className="text-lg text-gray-300 font-medium">{meme.text}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">Get In Touch</h2>
          <p className="text-gray-400 mb-12 text-lg text-center">
            Got a project? Need a developer who can handle chaos? Let&apos;s talk.
          </p>

          <Card glow={true}>
            <ContactForm />
          </Card>
        </motion.div>
      </section>
    </main>
  );
}

