// This route requires Node.js runtime due to usage of bcryptjs in auth.config.ts
export const runtime = "nodejs";

export { GET, POST } from "@/server/utils/auth";
