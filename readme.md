# 🚀 Alters Lab Next.js Monorepo

[![Build Status](https://github.com/samtheory/alters_lab_nextjs_monorepo/actions/workflows/build.yaml/badge.svg)](https://github.com/samtheory/alters_lab_nextjs_monorepo/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/samtheory/alters_lab_nextjs_monorepo?logo=codecov)](https://codecov.io/gh/samtheory/alters_lab_nextjs_monorepo)
[![GitHub Stars](https://img.shields.io/github/stars/samtheory/alters_lab_nextjs_monorepo?style=social)](https://github.com/samtheory/alters_lab_nextjs_monorepo/stargazers)

[![Monorepo](https://img.shields.io/badge/monorepo-pnpm%20workspace-blueviolet?logo=pnpm)](https://pnpm.io)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org)
[![TurboRepo](https://img.shields.io/badge/TurboRepo-Enabled-8B5CF6?logo=turbo)](https://turbo.build)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-4B5563?logo=zustand)](https://zustand-demo.pmnd.rs)
[![shadcn/ui](https://img.shields.io/badge/shadcn--ui-React%20Components-38BDF8?logo=react)](https://ui.shadcn.com)
[![Hero UI](https://img.shields.io/badge/Hero%20UI-Component%20Library-22D3EE?logo=react)](https://heroui.dev)

A **production-ready monorepo** featuring **Next.js 16**, **React 19**, comprehensive form handling, state management, and modern UI libraries. Built with enterprise-grade tooling for Web3 wallet analytics.

## ✨ Key Features

- 🔥 **Next.js 16** with Turbopack & React 19 Compiler
- 🎨 **Dual UI Libraries**: shadcn/ui + Hero UI working together
- 📋 **Complete Forms System**: Zod validation + React Hook Form + multi-step wizards
- 🏪 **State Management**: Zustand with persistence and Immer middleware
- 🌐 **Enhanced API Client**: React Query + Axios with auth & caching
- 📱 **Responsive Design**: Tailwind CSS 4 with CSS variables
- 🛠️ **Developer Experience**: TypeScript, ESLint, pnpm workspace, Turbo

## 🏗️ Project Structure

```
├── apps/
│   ├── api/              # Bun + Hono API server (port 4000)
│   ├── wallet-scan/      # 🔍 Main Web3 wallet analytics app (port 3001) 
│   ├── duels/            # Next.js app (port 3002)
│   └── journal/          # Next.js app (port 3003)
├── packages/
│   ├── api-client/       # 🌐 Enhanced API client with React Query
│   ├── config/           # ⚙️ Shared configurations (ESLint, Tailwind, TypeScript)
│   ├── forms/            # 📋 Complete form handling system
│   ├── store/            # 🏪 Zustand state management
│   ├── types/            # 📝 Shared TypeScript types
│   ├── ui/               # 🎨 Shared React components (shadcn/ui)
│   └── utils/            # 🛠️ Shared utility functions
├── infra/
│   └── docker-compose.yml
└── .github/
    └── workflows/
        └── build.yaml
```

## 🎯 Main Applications

### � **Wallet Scanner** (`apps/wallet-scan`)

**Advanced Web3 wallet analytics and portfolio tracking**

**Features:**

- **Wallet Analysis**: Real-time portfolio tracking and performance analytics
- **High-Potential Discovery**: AI-powered identification of successful wallets
- **Trading Signals**: Buy/sell alerts based on wallet activity
- **Multi-chain Support**: ETH, BSC, Polygon, Arbitrum, Optimism
- **Complete Forms Demo**: `/forms` - Comprehensive form handling showcase
- **UI Component Test**: `/test` - Hero UI component demonstration

**Tech Stack:**

- Next.js 16 + React 19 + TypeScript
- Hero UI + shadcn/ui components
- Zustand state management
- Zod + React Hook Form
- Tailwind CSS 4

## �📦 Core Packages

### 🎨 `@ui/shared` - UI Component Library

**shadcn/ui components with Tailwind CSS and modern variants**

```typescript
import { Button, Card, CardContent } from '@ui/shared'

// Component variants with class-variance-authority
const button = buttonVariants({ variant: "outline", size: "lg" })
```

**Components:**

- ✅ Button (with CVA variants)
- ✅ Card components (Header, Content, Footer)
- ✅ Utility functions (cn, class merging)

### 📋 `@forms/shared` - Form Handling System

**Complete form solution with validation, multi-step wizards, and auto-save**

```typescript
import { 
  WalletScanForm, 
  AuthForm, 
  UserProfileForm, 
  useZodForm, 
  useMultiStepForm 
} from '@forms/shared'

// Zod-powered form with React Hook Form
const form = useZodForm(walletAddressSchema, {
  defaultValues: { address: '' }
})
```

**Features:**

- ✅ **Pre-built Components**: Wallet scanner, auth, profile, settings forms
- ✅ **Custom Hooks**: useZodForm, useFormSubmission, useAutoSave, useMultiStepForm
- ✅ **Validation Schemas**: Comprehensive Zod schemas for all form types
- ✅ **Multi-step Wizards**: Progress tracking and step navigation
- ✅ **Auto-save**: Automatic form data persistence

### 🏪 `@store/shared` - State Management

**Zustand stores with Immer middleware and persistence**

```typescript
import { useWalletStore, useAppStore } from '@store/shared'

// Wallet scanner state
const { scanWallet, scannedWallets, currentWallet } = useWalletStore()

// App-wide settings
const { theme, setTheme, notifications } = useAppStore()
```

**Stores:**

- ✅ **Wallet Store**: Scanner state, wallet data, high-potential tracking
- ✅ **App Store**: Theme, notifications, user preferences
- ✅ **Persistence**: LocalStorage integration
- ✅ **Immer Integration**: Immutable state updates

### 🌐 `@api/client` - Enhanced API Client

**Production-ready API client with authentication, caching, and error handling**

```typescript
import { apiClient, useApiQuery, AuthManager } from '@api/client'

// React Query hooks
const { data, isLoading, error } = useApiQuery('/wallets', {
  retry: 3,
  staleTime: 5 * 60 * 1000
})

// Authentication
AuthManager.login(credentials)
```

**Features:**

- ✅ **React Query Integration**: Server state management with caching
- ✅ **Authentication**: JWT token management with auto-refresh
- ✅ **Interceptors**: Request/response transformation
- ✅ **Error Handling**: Centralized error management
- ✅ **TypeScript**: Full type safety

### ⚙️ `@config/shared` - Shared Configuration

**Unified configuration for ESLint, Tailwind, and TypeScript**

**Configurations:**

- ✅ **ESLint**: Base rules for React, TypeScript, and Next.js
- ✅ **Tailwind**: CSS variables, dark mode, and component utilities
- ✅ **TypeScript**: Strict configs for Next.js and Node.js environments

### 📝 `@types/shared` - TypeScript Types

**Shared type definitions and interfaces**

```typescript
import { User, GameResult, PricePoint, WalletData } from '@types/shared'
```

### 🛠️ `@utils/shared` - Utility Functions

**Organized utility functions by category**

```typescript
import { nowISO } from '@utils/shared/time'
import { math } from '@utils/shared'
import { crypto } from '@utils/shared'
```

**Categories:**

- ✅ **Time**: Date/time formatting and manipulation
- ✅ **Math**: Calculations and number formatting
- ✅ **Crypto**: Encryption and hashing utilities

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **pnpm**: v8+ (for workspace management)
- **Bun**: v1.0+ (for API server)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd alters-lab-nextjs-monorepo

# Install all dependencies
pnpm install

# Start all development servers
pnpm dev
```

### Development Servers

The monorepo will start the following services:

- 🔗 **API Server**: <http://localhost:4000> (Bun + Hono)
- 🔍 **Wallet Scanner**: <http://localhost:3001> (Next.js + Hero UI)
- ⚔️ **Duels**: <http://localhost:3002> (Next.js)
- 📔 **Journal**: <http://localhost:3003> (Next.js)

## 📋 Available Commands

### Installation & Development

```bash
# Install all dependencies
pnpm install

# Install for specific workspace
pnpm --filter wallet-scan install

# Development (all apps)
pnpm dev

# Development (specific app)
pnpm --filter wallet-scan dev

# Build all apps
pnpm build

# Build specific app
pnpm --filter wallet-scan build

# Run tests
pnpm test

# Lint all packages
pnpm lint

# Format code
pnpm format
```

### Package Management

```bash
# Add dependency to specific package
pnpm --filter @forms/shared add react-hook-form

# Add workspace dependency
pnpm --filter wallet-scan add @forms/shared@workspace:*

# Update all dependencies
pnpm update

# Check dependency graph
pnpm list --depth=2
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` files in each app:

```bash
# apps/wallet-scan/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Tailwind CSS Variables

The project uses CSS variables for theming:

```css
:root {
  --primary: 220 14% 96%;
  --primary-foreground: 220 9% 46%;
  /* ... */
}

[data-theme="dark"] {
  --primary: 220 13% 18%;
  --primary-foreground: 220 9% 84%;
  /* ... */
}
```

## 🎨 UI Libraries Integration

### shadcn/ui + Hero UI

The project demonstrates how to use **both** UI libraries together:

```typescript
// shadcn/ui components
import { Button, Card } from '@ui/shared'

// Hero UI components  
import { NextUIProvider, Button as HeroButton } from '@heroui/react'

// Use together in components
<Card>
  <Button variant="outline">shadcn Button</Button>
  <HeroButton color="primary">Hero UI Button</HeroButton>
</Card>
```

### Component Variants

```typescript
// shadcn/ui with class-variance-authority
const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border border-input bg-background"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8"
    }
  }
})
```

## 📱 Demo Features

### Wallet Scanner Application

Visit the **Wallet Scanner** app at <http://localhost:3001> to explore:

**Main Dashboard:**

- Real-time wallet analysis
- Hero UI components showcase
- State management demonstration

**Forms Demo** (`/forms`):

- ✅ **Wallet Address Form**: Zod validation + auto-save
- ✅ **Multi-step Wizard**: Progress tracking + navigation
- ✅ **User Profile**: Complex form with nested validation
- ✅ **Settings Form**: Dynamic fields + conditional logic
- ✅ **Authentication**: Login/register with error handling

**Component Test** (`/test`):

- Hero UI component library showcase
- Interactive component examples
- Theme switching demonstration

## 🏗️ Architecture Decisions

### Why This Stack?

**Next.js 16 + React 19:**

- ✅ Latest features (Server Components, Suspense, Concurrent Features)
- ✅ Turbopack for fast development builds
- ✅ React Compiler for automatic optimization

**Dual UI Libraries:**

- ✅ **shadcn/ui**: Customizable, copy-paste components
- ✅ **Hero UI**: Complete component library with built-in functionality
- ✅ Best of both worlds: flexibility + productivity

**Zustand + React Query:**

- ✅ **Zustand**: Simple, lightweight state management
- ✅ **React Query**: Server state, caching, and synchronization
- ✅ Clear separation of client vs server state

**pnpm + Turbo:**

- ✅ **pnpm**: Fast, disk-efficient package management
- ✅ **Turbo**: Intelligent build caching and parallelization
- ✅ Monorepo optimization for large codebases

### Project Patterns

**Package Organization:**

```text
packages/
├── ui/           # Component library (shadcn/ui)
├── forms/        # Form handling system
├── store/        # State management
├── api-client/   # API layer
├── config/       # Shared configurations
├── types/        # TypeScript definitions
└── utils/        # Utility functions
```

**Import Conventions:**

```typescript
// Workspace packages
import { Button } from '@ui/shared'
import { useWalletStore } from '@store/shared'
import { WalletScanForm } from '@forms/shared'

// External packages
import { NextUIProvider } from '@heroui/react'
import { create } from 'zustand'
```

## � Docker & Production

### Docker Compose

```bash
# Build and run all services
docker-compose -f infra/docker-compose.yml up --build

# Run specific service
docker-compose -f infra/docker-compose.yml up wallet-scan
```

### Production Deployment

```bash
# Build for production
pnpm build

# Start production servers
pnpm start

# Health check
curl http://localhost:4000/health
```

## 🔍 Troubleshooting

### Common Issues

**1. Hydration Errors:**

```bash
# Fixed: Remove dynamic content from SSR
# Use useEffect for client-side only content
useEffect(() => {
  setMountedTime(new Date().toISOString())
}, [])
```

**2. Module Resolution:**

```bash
# Ensure workspace dependencies are installed
pnpm install

# Clear cache
pnpm store prune
```

**3. Type Errors:**

```bash
# Rebuild TypeScript references
pnpm build:types

# Check workspace dependencies
pnpm --filter @forms/shared list
```

### Development Tips

**Hot Reload Issues:**

- Restart dev server: `pnpm dev`
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `pnpm install`

**Performance Optimization:**

- Use `pnpm --filter` for targeted commands
- Enable Turbo cache: `turbo build --cache-dir=.turbo`
- Monitor bundle size: `pnpm analyze`

## 🤝 Contributing

### Development Workflow

1. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
2. **Install Dependencies**: `pnpm install`
3. **Start Development**: `pnpm dev`
4. **Run Tests**: `pnpm test`
5. **Build & Lint**: `pnpm build && pnpm lint`
6. **Commit Changes**: Follow conventional commits
7. **Create Pull Request**: Include description and testing notes

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Extended React/Next.js configs
- **Prettier**: Consistent formatting
- **Conventional Commits**: Semantic versioning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Alters Lab team**

*Transforming Web3 analytics with modern React architecture*

# Run specific app

pnpm --filter arena dev    # <http://localhost:3001>
pnpm --filter duels dev    # <http://localhost:3002>  
pnpm --filter journal dev  # <http://localhost:3003>
pnpm --filter api dev      # Bun server

# Run multiple specific apps

pnpm --filter arena --filter duels dev

```

### Building
```bash
# Build all projects
pnpm build

# Build specific app
pnpm --filter arena build
pnpm --filter api build

# Build with dependencies
pnpm turbo run build
```

### Linting & Type Checking

```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck

# Lint specific package
pnpm --filter arena lint
```

### Package Management

```bash
# Add dependency to specific workspace
pnpm --filter arena add react-query
pnpm --filter api add express

# Add dependency to shared package
pnpm --filter @ui/shared add lucide-react

# Add dev dependency
pnpm --filter arena add -D @types/node

# Remove dependency
pnpm --filter arena remove old-package
```

## 🛠️ Development Workflow

### Adding a New Shared Component

1. Create component in `packages/ui/src/components/`
2. Export it in `packages/ui/src/index.ts`
3. Import in your app: `import { NewComponent } from "@ui/shared"`

### Adding a New Utility Function

1. Add function to appropriate category in `packages/utils/src/`
2. Export it in the category's `index.ts`
3. Import: `import { newFunction } from "@utils/shared/category"`

### Creating a New App

1. Create new folder in `apps/`
2. Add to `pnpm-workspace.yaml` (already configured with `apps/*`)
3. Add shared dependencies to the new app's `package.json`:

   ```json
   {
     "dependencies": {
       "@ui/shared": "workspace:*",
       "@types/shared": "workspace:*",
       "@utils/shared": "workspace:*",
       "@config/shared": "workspace:*",
       "@api/client": "workspace:*"
     }
   }
   ```

## 📱 App URLs (Development)

- **Arena**: <http://localhost:3001>
- **Duels**: <http://localhost:3002>
- **Journal**: <http://localhost:3003>
- **API**: <http://localhost:4000>

## 🐳 Docker & Deployment

### Using Docker Compose

```bash
# Build and run all services
cd infra
docker-compose up --build

# Run specific service
docker-compose up api
docker-compose up arena
```

### Individual Docker Builds

```bash
# Build API
cd apps/api
docker build -t alters-api .

# Build Next.js app
cd apps/arena
docker build -t alters-arena .
```

### Production Build

```bash
# Build all for production
pnpm turbo run build

# Preview production build
cd apps/arena
pnpm start
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` files in each app directory:

**Apps (.env.local)**

```env
NEXT_PUBLIC_API_BASE=http://localhost:8787
```

**API (.env)**

```env
PORT=8787
NODE_ENV=production
```

### Adding Dependencies to Shared Packages

When adding external dependencies to shared packages, consider:

1. **Peer Dependencies**: For React components in `@ui/shared`
2. **Regular Dependencies**: For utilities in `@utils/shared`
3. **Dev Dependencies**: For build tools in `@config/shared`

Example for `@ui/shared`:

```json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "clsx": "^2.0.0"
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Module not found" errors**:
   - Run `pnpm install` in root
   - Check if package is added to dependencies with `workspace:*`

2. **TypeScript errors with shared packages**:
   - Ensure exports are properly configured in package.json
   - Check tsconfig.json extends the shared config

3. **Hot reload not working with shared packages**:
   - Restart dev server
   - Shared packages don't auto-reload; restart when changing them

4. **Build fails**:
   - Ensure all shared packages can be built independently
   - Check for circular dependencies between packages

### Useful Debug Commands

```bash
# Check workspace packages
pnpm list --depth=0

# Check specific package info
pnpm --filter arena list

# Clear node_modules and reinstall
pnpm clean && pnpm install

# Check turbo cache
pnpm turbo run build --dry=json
```

## 📚 Tech Stack

- **Package Manager**: pnpm
- **Build Tool**: Turbo
- **Frontend**: Next.js 16 (React 19, TypeScript)
- **Backend**: Bun + Hono
- **Styling**: Tailwind CSS 4
- **Containerization**: Docker
- **CI/CD**: GitLab CI

## 👥 Contributing

1. Install dependencies: `pnpm install`
2. Start development: `pnpm dev`
3. Make changes to shared packages or apps
4. Test builds: `pnpm build`
5. Submit PR

---

**Author**: SAJJAD ALIZADEH  
**License**: ISC
