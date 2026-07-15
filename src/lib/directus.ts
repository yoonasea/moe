import { createDirectus, rest, staticToken } from "@directus/sdk";

const url = process.env.DIRECTUS_URL || "http://localhost:8055";
const token = process.env.DIRECTUS_TOKEN || "";

export const client = createDirectus(url).with(staticToken(token)).with(rest());
