import fs from "fs";
import path from "path";

export default async (client) => {
    const eventsPath = path.join(process.cwd(), "Events");
    if (!fs.existsSync(eventsPath)) return 0;
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = (await import(`../Events/${file}`)).default;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    return eventFiles.length;
};
