# Quick Reference Card

## 🚀 Most Used Commands

```bash
# Setup
pnpm install

# Development (all apps)
pnpm dev

# Development (single app)
pnpm --filter arena dev     # port 3001
pnpm --filter duels dev     # port 3002
pnpm --filter journal dev   # port 3003
pnpm --filter api dev       # bun server

# Build everything
pnpm build

# Add dependency to app
pnpm --filter arena add package-name

# Add shared package to app (already configured)
# @ui/shared, @types/shared, @utils/shared, @config/shared, @api/client
```

## 📦 Import Examples

```typescript
// Components
import { Button } from "@ui/shared";

// Types
import { User, GameResult } from "@types/shared";

// Utils
import { nowISO } from "@utils/shared/time";
import { math, crypto } from "@utils/shared";

// API
import { health } from "@api/client";

// Config (in config files)
import config from "@config/shared/tailwind";
```

## 🌐 Development URLs

- Arena: http://localhost:3001
- Duels: http://localhost:3002  
- Journal: http://localhost:3003
- API: http://localhost:4000