import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import config from "./config.js";
import loadCommands from "./Handlers/Commands.js";
import loadEvents from "./Handlers/Events.js";
import loadPrefix from "./Handlers/Prefix.js";
import loadModels from "./Handlers/Models.js";
import { startupReport } from "./Handlers/logger.js";
import AntiCrash from "./Handlers/AntiCrash.js";
import connectMongo from "./Database/mongo.js";

async function main() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel],
    });

    client.commands = new Collection();
    client.prefixCommands = new Collection();
    client.config = config;

    const anticrashActive = AntiCrash(client);

    const mongoConnected = await connectMongo();

    const slashCount = await loadCommands(client);
    const prefixCount = await loadPrefix(client);
    const eventsCount = await loadEvents(client);
    const modelsCount = await loadModels(client);

    startupReport({
        name: "Kanna Bot",
        prefix: prefixCount,
        slash: slashCount,
        events: eventsCount,
        models: modelsCount,
        anticrash: anticrashActive,
        mongo: mongoConnected
    });

    await client.login(config.token);
}

main().catch(console.error);
