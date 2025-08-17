import { sendGuildJoinEvent } from '../Core/joinGuildWebhook.js';

export default {
    name: "guildCreate",
    execute(guild, client) {
        sendGuildJoinEvent(guild, client);
    },
}; 