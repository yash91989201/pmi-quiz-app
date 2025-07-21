FROM oven/bun:alpine

# Set the working directory
WORKDIR /app

# Installing only required packages for migration
RUN bun install drizzle-kit@0.20.13 @t3-oss/env-nextjs@0.7.1 zod@3.22.4 drizzle-orm@0.29.3 mysql2@3.7.0

# Copy only necessary files for migration
COPY ./drizzle ./drizzle
COPY ./drizzle.config.ts .

# Set the entrypoint
ENTRYPOINT ["bunx", "--bun", "drizzle-kit", "push:mysql", "--config", "drizzle.config.ts"]
