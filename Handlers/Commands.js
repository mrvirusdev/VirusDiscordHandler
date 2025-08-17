import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import config from "../config.js";
import { pathToFileURL } from "url";

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith(".js")) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

export default async (client) => {
    const slashCommands = [];
    const commandsPath = path.join(process.cwd(), "Commands", "Slash");

    if (!fs.existsSync(commandsPath)) return 0;

    const commandFiles = getAllFiles(commandsPath);

    for (const file of commandFiles) {
        const fileURL = pathToFileURL(file).href;
        const command = (await import(fileURL)).default;
        if (command?.data) {
            client.commands.set(command.data.name, command);
            slashCommands.push(command.data.toJSON());
        }
    }

    try {
        const rest = new REST({ version: "10" }).setToken(config.token);
        if (slashCommands.length) {
            await rest.put(Routes.applicationCommands(config.clientId), { body: slashCommands });
        }
    } catch (e) {
        console.error("[Commands] Failed to register slash commands", e);
    }

    return slashCommands.length;
};
