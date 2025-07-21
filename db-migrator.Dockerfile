FROM oven/bun:alpine

# Set the working directory
WORKDIR /app

# Installing only required packages for migration
RUN bun install drizzle-kit@latest @t3-oss/env-nextjs@latest zod@latest drizzle-orm@latest mysql2@latest

# Copy only necessary files for migration
COPY ./drizzle ./drizzle
COPY ./drizzle.config.ts .

# Set the entrypoint
ENTRYPOINT ["bunx", "--bun", "drizzle-kit", "migrate", "--config", "drizzle.config.ts"]
