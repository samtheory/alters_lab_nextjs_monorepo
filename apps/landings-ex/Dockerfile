# Stage 1: build
FROM node:22-alpine AS build
WORKDIR /repo
COPY ../../pnpm-workspace.yaml ../../package.json ./
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
COPY ../../ ./
WORKDIR /repo/apps/arena
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Stage 2: run
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /repo/apps/arena/.next ./.next
COPY --from=build /repo/apps/arena/package.json ./package.json
COPY --from=build /repo/apps/arena/public ./public
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate && pnpm install --prod --frozen-lockfile
EXPOSE 3000
CMD ["pnpm","start","-p","3000"]
