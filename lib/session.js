const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { SESSION_ID } = require("../config");

function saveJsonToFile(mergedJSON, outputFolderPath) {
    if (!fs.existsSync(outputFolderPath)) {
        fs.mkdirSync(outputFolderPath, { recursive: true });
    }
    for (const [fileName, fileContent] of Object.entries(mergedJSON)) {
        const outputPath = path.join(outputFolderPath, fileName);
        fs.writeFileSync(outputPath, JSON.stringify(fileContent, null, 2));
        console.log(`Saved ${fileName} to ${outputPath}`);
    }
}

async function MakeSession(sessionId = SESSION_ID, folderPath = "../sessions") {
    try {
        if (!sessionId.startsWith("Rudhra~")) {
            throw new Error("Invalid session ID format");
        }

        const decryptedSessionId = sessionId.split("Rudhra~")[1].split('').reverse().join('');
        const response = await axios.get(`https://pastebin.com/raw/${decryptedSessionId}`);

        if (typeof response.data !== "object" || response.data === null) {
            throw new Error("Invalid JSON data received");
        }

        saveJsonToFile(response.data, folderPath);
        console.log("Session loaded successfully");

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

module.exports = { MakeSession };
