import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

const app = express();

// CORS only needed in dev (in prod the frontend is served from the same origin)
if (!isProd) {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json({ limit: "10mb" }));

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

app.post("/api/messages", async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not set in server environment" });
  }

  try {
    const response = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve the built frontend in production
if (isProd) {
  const distPath = join(__dirname, "../dist");
  app.use(express.static(distPath));
  // All non-API routes return index.html (SPA fallback)
  app.use((_req, res) => {
    res.sendFile(join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
