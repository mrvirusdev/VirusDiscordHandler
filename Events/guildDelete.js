import { sendGuildLeaveEvent } from '../Core/leaveGuildWebhook.js';

export default {
    name: "guildDelete",
    execute(guild, client) {
        sendGuildLeaveEvent(guild, client);

    },
}; 