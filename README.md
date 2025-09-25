# React + TypeScript + Vite + shadcn/ui

A modern React application built with Vite, TypeScript, and shadcn/ui components.

## 🚀 Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with new features
- 🔷 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful and accessible component library
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🔄 **GitHub Actions** - Automated CI/CD pipeline

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## 🛠️ Installation

1. Clone the repository

```bash
git clone <repository-url>
cd FE-SG/fe--sg
```

2. Install dependencies

```bash
pnpm install
```

3. Start development server

```bash
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## 🎨 Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
```

## 🚀 GitHub Actions Workflows

This project includes several GitHub Actions workflows:

### 1. Build and Test (`build.yml`)

- Runs on every push and pull request
- Tests the build process
- Runs linting

### 2. CI/CD Pipeline (`ci-cd.yml`)

- Comprehensive pipeline with multiple Node.js versions
- Automatically deploys to GitHub Pages on main branch
- Caches dependencies for faster builds

### 3. Vercel Deploy (`vercel-deploy.yml`)

- Auto-deploy to Vercel on main branch pushes
- Requires Vercel tokens in repository secrets

## 🔧 Environment Variables

For Vercel deployment, add these secrets to your GitHub repository:

- `VERCEL_TOKEN` - Your Vercel token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── form-login.tsx   # Custom components
├── lib/                 # Utilities
│   └── utils.ts         # Utility functions
├── assets/              # Static assets
├── App.tsx              # Main App component
└── main.tsx             # Application entry point
```

## 🎯 Deployment

### GitHub Pages

The project automatically deploys to GitHub Pages when code is pushed to the main branch.

### Vercel

Connect your GitHub repository to Vercel for automatic deployments, or use the GitHub Action workflow.

### Manual Build

```bash
pnpm run build
# Files will be generated in the `dist` directory
```

## 🧩 Component Usage

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```
