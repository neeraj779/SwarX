import { envServer } from "@/config/env.server";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(envServer.DATABASE_URL);
