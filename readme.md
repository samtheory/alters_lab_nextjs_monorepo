# Alters Lab Next.js Monorepo

A modern monorepo setup using **pnpm**, **Turbo**, and **Next.js** with shared packages and a Bun/Hono API.

## 🏗️ Project Structure

```
├── apps/
│   ├── api/              # Bun + Hono API server
│   ├── arena/            # Next.js app (port 3001)
│   ├── duels/            # Next.js app (port 3002)
│   └── journal/          # Next.js app (port 3003)
├── packages/
│   ├── api-client/       # API client utilities
│   ├── config/           # Shared configurations (ESLint, Tailwind, TypeScript)
│   ├── types/            # Shared TypeScript types
│   ├── ui/               # Shared React components
│   └── utils/            # Shared utility functions
├── infra/
│   └── docker-compose.yml
└── .github/
    └── workflows/
        └── build.yaml
```

## 📦 Shared Packages

### `@ui/shared`
React components shared across Next.js apps
```typescript
import { Button } from "@ui/shared";
```

### `@types/shared`
TypeScript interfaces and types
```typescript
import { User, GameResult, PricePoint } from "@types/shared";
```

### `@utils/shared`
Utility functions organized by category
```typescript
import { nowISO } from "@utils/shared/time";
import { math } from "@utils/shared";
import { crypto } from "@utils/shared";
```

### `@config/shared`
Shared configuration files
```typescript
// In next.config.ts
import config from "@config/shared/tailwind";

// In eslint.config.mjs
import baseConfig from "@config/shared/eslint";

// In tsconfig.json
{
  "extends": "@config/shared/tsconfig/nextjs"
}
```

### `@api/client`
API client for communicating with the backend
```typescript
import { health } from "@api/client";

const healthStatus = await health();
```

## 🚀 Available Commands

### Installation
```bash
# Install all dependencies
pnpm install

# Install dependencies for specific workspace
pnpm --filter arena install
```

### Development
```bash
# Run all apps in development mode (parallel)
pnpm dev

# Run specific app
pnpm --filter arena dev    # http://localhost:3001
pnpm --filter duels dev    # http://localhost:3002  
pnpm --filter journal dev  # http://localhost:3003
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

- **Arena**: http://localhost:3001
- **Duels**: http://localhost:3002
- **Journal**: http://localhost:3003
- **API**: http://localhost:4000

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
- **CI/CD**: GitHub Actions

## 👥 Contributing

1. Install dependencies: `pnpm install`
2. Start development: `pnpm dev`
3. Make changes to shared packages or apps
4. Test builds: `pnpm build`
5. Submit PR

---

**Author**: SAJJAD ALIZADEH  
**License**: ISC
