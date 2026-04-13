import "dotenv/config"
import express, { type NextFunction, type Request, type Response } from "express";
import { Sandbox } from '@e2b/code-interpreter'
import cors from "cors"



const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}))

app.post("/preview", async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ message: "Code is not valid" });
  }

  const WORKDIR = "/home/user/app";

  try {
    const sandbox = await Sandbox.create({
      apiKey: process.env.E2B_API_KEY || "",
    });

    await sandbox.commands.run(`mkdir -p ${WORKDIR}/src`);

    await sandbox.files.write(
      `${WORKDIR}/package.json`,
      `{
  "name": "preview-app",
  "private": true,
  "scripts": {
    "dev": "vite --port 5173 --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  }
}`
    );

    await sandbox.files.write(
      `${WORKDIR}/vite.config.ts`,
      `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true
  }
})
`
    );

    await sandbox.files.write(
      `${WORKDIR}/index.html`,
      `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
    );

    await sandbox.files.write(
      `${WORKDIR}/src/main.tsx`,
      `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
    );

    await sandbox.files.write(`${WORKDIR}/src/App.tsx`, code);

    await sandbox.commands.run("npm install", {
      cwd: WORKDIR,
      timeoutMs: 0,
    });

    sandbox.commands.run("npm run dev", {
      cwd: WORKDIR,
      background: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 6000));

    const url = await sandbox.getHost(5173);

    return res.json({ url : `https://${url}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate preview" });
  }
});

app.listen(PORT, () => {
  console.log("Server running at Port: ", PORT);
})
