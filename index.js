const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const config = require("./config");
const { MakeSession } = require("./lib/session");
const { connect, patch, parseDir } = require("./lib");
const { getandRequirePlugins } = require("./lib/database/plugins");
global.__basedir = __dirname;

async function initialize() {
  try {
    if (!fsx.existsSync("./lib/session/creds.json")) {
            await MakeSession(config.SESSION_ID, "./lib/session");
            console.log("Version : " + require("./package.json").version);
        }
        console.log("WhatsApp Bot Initializing...");
    
    await parseDir(path.join(__dirname, "/lib/database/"));
    console.log("Syncing Database");
    await config.DATABASE.sync();
    await parseDir(path.join(__dirname, "/plugins/"));
    await getandRequirePlugins();
    console.log("External Modules Installed");
    return await connect();
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("Bot Running");
  });

  app.listen(port, () => {});
}

async function tempDir() {
  const dir = path.join(__dirname, "temp");
  try {
    await fs.access(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    }
  }
}

async function main() {
  try {
    await initialize();
    await startServer();
    await tempDir();
  } catch (error) {
    console.warn("BOT SYSTEM FAILED");
  }
}

main();











/* const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const config = require("./config");
const { connect, saveCreds, ensureSessionDirectory, patch, parseDir } = require("./lib");
const { getandRequirePlugins } = require("./lib/database/plugins");
global.__basedir = __dirname;

async function initialize() {
  try {
    await ensureSessionDirectory();
    await saveCreds(config.SESSION_ID);
    await parseDir(path.join(__dirname, "/lib/database/"));
    console.log("Syncing Database");
    await config.DATABASE.sync();
    await parseDir(path.join(__dirname, "/plugins/"));
    await getandRequirePlugins();
    console.log("External Modules Installed");
    return await connect();
  } catch (error) {
    console.error("Initialization error:", error.message);
  }
}

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("Bot Running");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

async function tempDir() {
  const dir = path.join(__dirname, "temp");
  try {
    await fs.access(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    }
  }
}

async function main() {
  try {
    await initialize();
    await startServer();
    await tempDir();
  } catch (error) {
    console.warn("BOT SYSTEM FAILED:", error.message);
  }
}

main(); */
