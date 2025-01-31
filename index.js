const fs = require("fs").promises;
const fsx = require("fs");
const path = require("path");
const express = require("express");
const config = require("./config");
const { MakeSession } = require("./lib/session");
const { connect, patch, parseDir } = require("./lib");
const { getandRequirePlugins } = require("./lib/database/plugins");

global.__basedir = __dirname;

/**
 * Initializes the WhatsApp bot.
 */
async function initialize() {
  try {
    // Check if session credentials exist, else create a new session
    if (!fsx.existsSync("./lib/session/creds.json")) {
      await MakeSession(config.SESSION_ID, "./lib/session");
      console.log("Version:", require("./package.json").version);
    }
    
    console.log("WhatsApp Bot Initializing...");

    // Sync the database
    console.log("Syncing Database...");
    await parseDir(path.join(__dirname, "/lib/database/"));
    await config.DATABASE.sync();

    // Load plugins
    await parseDir(path.join(__dirname, "/plugins/"));
    await getandRequirePlugins();
    console.log("External Modules Installed");

    // Connect to WhatsApp
    return await connect();
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

/**
 * Starts the Express server.
 */
async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("Bot Running");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

/**
 * Ensures the temporary directory exists.
 */
async function ensureTempDir() {
  const dir = path.join(__dirname, "temp");
  try {
    await fs.access(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
    }
  }
}

/**
 * Main function to start the bot.
 */
async function main() {
  try {
    await initialize();
    await startServer();
    await ensureTempDir();
  } catch (error) {
    console.error("BOT SYSTEM FAILED:", error);
  }
}

// Start the bot
main();
