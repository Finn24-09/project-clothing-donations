# Stage 1: builder ────────────────────────────────────────────────────────
FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /app

# Install dependencies first (layer-cached until package files change)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: runner ─────────────────────────────────────────────────────────
FROM cgr.dev/chainguard/nginx:latest AS runner

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (replaces the default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["-g", "daemon off;"]
