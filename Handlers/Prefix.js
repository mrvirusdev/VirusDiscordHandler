import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export default async (client) => {
    const commandsPath = path.join(process.cwd(), "Commands", "Prefix");
    if (!fs.existsSync(commandsPath)) return 0;

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

    const commandFiles = getAllFiles(commandsPath);

    for (const file of commandFiles) {
        const fileURL = pathToFileURL(file).href;
        const command = (await import(fileURL)).default;
        if (command && command.name) {
            client.prefixCommands.set(command.name, command);
        }
    }

    return client.prefixCommands.size;
};
