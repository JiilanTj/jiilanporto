/**
 * Database Seed Script
 * Populating the database with projects I may or may not have enjoyed building
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with sarcastic projects...');

  // Clear existing data (because we love a fresh start)
  await prisma.user.deleteMany();
  await prisma.message.deleteMany();
  await prisma.project.deleteMany();
  await prisma.hit.deleteMany();

  // Seed admin user
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('jiilan2024', 10);
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin user created: username=admin, password=jiilan2024');

  // Seed projects
  const projects = [
    {
      slug: 'e-commerce-platform',
      title: 'E-Commerce Platform That Actually Works',
      description: 'Full-stack e-commerce with payment integration. Surprisingly didn\'t break in production.',
      longDescription: 'A complete e-commerce solution built with Next.js, Stripe, and enough coffee to kill a horse. Features include product management, cart functionality, checkout flow, and an admin dashboard. The kind of project that makes you question your life choices at 3 AM.',
      techStack: JSON.stringify(['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'TailwindCSS', 'Prisma']),
      category: 'Full-Stack',
      featured: true,
      imageUrl: '/images/projects/ecommerce.jpg',
      demoUrl: 'https://demo.example.com',
      repoUrl: 'https://github.com/jiilan/ecommerce',
      whatBroke: 'Payment webhooks. Stripe decided to randomly fail for 2 days. Turns out, I forgot to add the webhook endpoint to the allowed list. Classic.',
      screenshots: JSON.stringify(['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg']),
    },
    {
      slug: 'real-time-chat-app',
      title: 'Chat App (Because We Need Another One)',
      description: 'WebSocket-based real-time chat with rooms, typing indicators, and my tears.',
      longDescription: 'Real-time chat application featuring Socket.io, message persistence, room management, user authentication, and enough edge cases to make you cry. Built when I thought WebSockets would be "fun".',
      techStack: JSON.stringify(['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Redis']),
      category: 'Full-Stack',
      featured: true,
      imageUrl: '/images/projects/chat.jpg',
      demoUrl: 'https://chat.example.com',
      repoUrl: 'https://github.com/jiilan/chat-app',
      whatBroke: 'Reconnection logic. Users would disconnect and ghost messages would haunt the chat rooms like digital poltergeists. Fixed with a state reconciliation system I probably over-engineered.',
      screenshots: JSON.stringify(['/images/projects/chat-1.jpg', '/images/projects/chat-2.jpg']),
    },
    {
      slug: 'task-management-saas',
      title: 'Task Manager (Ironic, I Know)',
      description: 'SaaS task management platform. Yes, I use Notion for my own tasks.',
      longDescription: 'Multi-tenant SaaS application for task and project management. Features team collaboration, kanban boards, time tracking, and enough features to make Jira jealous. The irony is not lost on me that I built this while managing my own tasks in a messy text file.',
      techStack: JSON.stringify(['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'tRPC', 'TailwindCSS']),
      category: 'SaaS',
      featured: true,
      imageUrl: '/images/projects/taskmanager.jpg',
      demoUrl: 'https://tasks.example.com',
      repoUrl: 'https://github.com/jiilan/task-saas',
      whatBroke: 'Tenant isolation. Almost let User A see User B\'s tasks. Almost shipped a GDPR nightmare. Caught it in staging. Barely.',
      screenshots: JSON.stringify(['/images/projects/task-1.jpg', '/images/projects/task-2.jpg']),
    },
    {
      slug: 'mobile-fitness-tracker',
      title: 'Fitness Tracker (Built While Sitting)',
      description: 'React Native fitness app with workout tracking. Built from my couch.',
      longDescription: 'Cross-platform mobile fitness tracking application. Features workout logging, progress charts, custom routines, and social sharing. Built entirely while seated in the same position for 8 hours a day. The hypocrisy is the feature.',
      techStack: JSON.stringify(['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux']),
      category: 'Mobile',
      featured: false,
      imageUrl: '/images/projects/fitness.jpg',
      demoUrl: null,
      repoUrl: 'https://github.com/jiilan/fitness-tracker',
      whatBroke: 'HealthKit integration on iOS. Apple\'s documentation is a labyrinth designed by sadists. Spent 3 days fighting permissions and entitlements.',
      screenshots: JSON.stringify(['/images/projects/fitness-1.jpg']),
    },
    {
      slug: 'ai-content-generator',
      title: 'AI Content Generator (Peak 2023)',
      description: 'GPT-powered content generation tool. Jumped on the AI hype train.',
      longDescription: 'AI-powered content generation platform using OpenAI\'s GPT-4. Features template management, tone adjustment, multi-language support, and the ability to generate marketing copy that sounds suspiciously like every other AI-generated content on the internet.',
      techStack: JSON.stringify(['Next.js', 'OpenAI API', 'PostgreSQL', 'Stripe', 'TailwindCSS']),
      category: 'AI/ML',
      featured: false,
      imageUrl: '/images/projects/ai-content.jpg',
      demoUrl: 'https://ai.example.com',
      repoUrl: null,
      whatBroke: 'Rate limiting. OpenAI throttled me into oblivion on launch day. Had to implement queueing, caching, and sacrificial rate limit offerings to the API gods.',
      screenshots: JSON.stringify(['/images/projects/ai-1.jpg', '/images/projects/ai-2.jpg']),
    },
    {
      slug: 'blockchain-wallet',
      title: 'Crypto Wallet (Yes, That Phase)',
      description: 'Multi-chain wallet interface. Built during my brief crypto delusion.',
      longDescription: 'Web3 wallet interface supporting Ethereum, Polygon, and BSC. Features transaction history, token swaps, NFT gallery, and the crushing realization that gas fees are highway robbery.',
      techStack: JSON.stringify(['React', 'ethers.js', 'Web3', 'TailwindCSS', 'Hardhat']),
      category: 'Web3',
      featured: false,
      imageUrl: '/images/projects/wallet.jpg',
      demoUrl: null,
      repoUrl: 'https://github.com/jiilan/crypto-wallet',
      whatBroke: 'Everything. MetaMask integration, transaction signing, network switching, gas estimation. Web3 is chaos incarnate. But hey, it works now.',
      screenshots: JSON.stringify(['/images/projects/wallet-1.jpg']),
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
    console.log(`✅ Created project: ${project.title}`);
  }

  console.log('🎉 Seeding complete! Database is now full of sarcastic wisdom.');
}

main()
  .catch((e) => {
    console.error('💀 Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
