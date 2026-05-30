<div align="center">
  <img src="public/favicon.svg" alt="Saritima Logo" width="120" height="120" />
  <h1>Saritima AI</h1>
  <p><em>Advanced AI Assistant | Built by <strong>Sarwar Altaf Dar</strong></em></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

---

> 🎉 **Special Announcement:** Saritima is absolutely free for everyone for the next 40 days!

## ✧ Overview

Saritima is a state-of-the-art AI assistant designed for technical documentation, seamless workflow management, and professional project interaction. It features a highly refined, split-pane capable UI crafted with fluid CSS motion graphics, bringing an organic, premium aesthetic to your daily digital tasks.

## ✨ Features

- **Premium Interface:** Custom CSS fluid gradient meshes and a minimalist design system inspired by leading AI tools.
- **Intelligent Processing:** Built for unparalleled accuracy in documentation and workflow management.
- **Seamless Workspace:** A refined environment to chat and document simultaneously.
- **Persistent Sessions:** Full chat history powered by Supabase, complete with session renaming and deletion.
- **Dynamic Identity:** Personalized onboarding flows utilizing Clerk authentication.

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Authentication:** Clerk
- **Database & Storage:** Supabase (PostgreSQL)
- **Styling:** Custom Vanilla CSS with modern motion graphics (`mix-blend-mode`, `@keyframes`)
- **Routing:** React Router DOM
- **Markdown:** `react-markdown` with `react-syntax-highlighter`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Clerk Account
- A Supabase Project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/techxsarwar/saritima-ai.git
   cd saritima-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---
<div align="center">
  <em>Designed and developed with precision.</em>
</div>
