import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());

app.get("/health", (c) => c.json({ ok: true, service: "api" }));

export default app;