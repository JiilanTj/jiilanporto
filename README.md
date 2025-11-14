# Jiilan Nashrulloh Tanjung - Portfolio

> A sarcastically brilliant, technically impressive personal portfolio built with modern web technologies.

## 🎭 The Vibe

This isn't your typical corporate portfolio. It's dark, edgy, sarcastic, and chaotic—but in a polished, technically impressive way. Think "senior developer who uses sarcasm as oxygen" meets "3D cyberpunk aesthetic."

**Tone**: Sarcastic, chaotic, comedic suffering, but technically impressive.  
**Aesthetic**: Dark tech, neon, hacker-vibes, 3D elements, smooth animations.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber (R3F) + Drei
- **Database**: Prisma + SQLite
- **Icons**: React Icons

## 📦 Features

### Home Page
- 🎨 3D hero section with floating animated geometry
- 💬 Sarcastic headlines and developer memes
- 🛠️ Technical arsenal showcase
- 📁 Featured projects section
- 📧 Contact form with validation

### Projects
- 📋 Grid view with category filtering
- 🔍 Dynamic project detail pages
- 💾 Database-driven content
- 🎯 Featured project highlighting

### API Routes
- `/api/projects` - GET projects from database
- `/api/contact` - POST contact form submissions
- `/api/hit` - POST/GET visitor analytics

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Set up the database
npm run db:generate
npm run db:push
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
jiilanporto/
├── app/
│   ├── api/              # API routes
│   ├── projects/         # Projects pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── 3d/              # 3D components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── lib/
│   └── prisma.ts        # Prisma client
└── prisma/
    ├── schema.prisma    # Database schema
    └── seed.ts          # Seed script
```

## 🎨 Design System

### Colors
- **Primary**: Cyan (#06b6d4)
- **Secondary**: Purple (#9333ea)
- **Background**: Black (#000000)
- **Text**: Gray-300

### Animations
- Fade-in on scroll
- Slide-in sections
- Hover effects
- 3D floating elements

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
```

## 🎭 The Philosophy

> "Depressed coder forced to code since 2016."

This portfolio represents the duality of modern development:
- **Professional**: Clean code, best practices, type safety
- **Honest**: Sarcastic commentary, real struggles, meme energy

## 📄 License

MIT - Do whatever you want with it.

---

Built with Next.js, suffering, and excessive caffeine ☕
