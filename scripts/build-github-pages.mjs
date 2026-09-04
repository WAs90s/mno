import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const outputPublic = resolve(root, ".output/public");
const port = 8787;
const url = `http://127.0.0.1:${port}/`;

function run(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      ...options,
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server not ready yet.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 1000));
  }
  throw new Error("Timed out waiting for local preview server");
}

async function main() {
  console.log("Building app...");
  await run("npm", ["run", "build"]);

  console.log("Starting preview server for prerender...");
  const wrangler = spawn(
    "npx",
    ["wrangler", "dev", "--port", String(port), "--local", "--ip", "127.0.0.1"],
    {
      cwd: resolve(root, ".output"),
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
    },
  );

  wrangler.stderr.on("data", (chunk) => {
    process.stderr.write(chunk);
  });

  wrangler.stdout.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  const stopWrangler = () => {
    if (wrangler.pid) {
      try {
        process.kill(-wrangler.pid, "SIGKILL");
      } catch {
        wrangler.kill("SIGKILL");
      }
    }
  };

  try {
    await waitForServer();
    const html = await fetch(url).then((response) => response.text());

    rmSync(dist, { recursive: true, force: true });
    mkdirSync(dist, { recursive: true });
    cpSync(outputPublic, dist, { recursive: true });
    cpSync(resolve(root, "public/.well-known"), resolve(dist, ".well-known"), {
      recursive: true,
    });
    const publicHeaders = resolve(root, "public/_headers");
    if (existsSync(publicHeaders)) {
      cpSync(publicHeaders, resolve(dist, "_headers"));
    }
    const pqrSource = resolve(root, "public/pqr");
    if (existsSync(pqrSource)) {
      if (!existsSync(resolve(pqrSource, "index.html"))) {
        throw new Error(
          "public/pqr/index.html is missing. Run shop_owner_app/scripts/build_godaddy_web.sh /pqr/ first.",
        );
      }
      console.log("Copying shop owner web app from public/pqr...");
      cpSync(pqrSource, resolve(dist, "pqr"), {
        recursive: true,
        filter: (src) => {
          const name = src.split("/").pop() ?? "";
          return name !== "Archive.zip" && name !== ".DS_Store";
        },
      });
    } else {
      throw new Error(
        "public/pqr not found. From shop_owner_app run: ./scripts/build_godaddy_web.sh /pqr/",
      );
    }
    writeFileSync(resolve(dist, "index.html"), html);
    writeFileSync(resolve(dist, "404.html"), html);
    writeFileSync(resolve(dist, ".nojekyll"), "");
    cpSync(resolve(root, "CNAME"), resolve(dist, "CNAME"));

    console.log(`Static site ready in ${dist}`);
  } finally {
    stopWrangler();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
