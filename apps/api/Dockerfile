# build
FROM oven/bun:1.3 AS build
WORKDIR /repo
COPY ../../ ./
WORKDIR /repo/apps/api
RUN bun install
RUN bun build ./src/index.ts --outdir dist --target bun

# run
FROM oven/bun:1.3
WORKDIR /app
COPY --from=build /repo/apps/api/dist ./dist
EXPOSE 8787
CMD ["bun","run","dist/index.js"]
