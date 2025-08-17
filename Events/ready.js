import { sendBotReadyEvent } from '../Core/readyWebhook.js';

export default {
    name: "ready",
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [{ name: "Kanna Bot V2", type: 0 }],
            status: "online"
        });
        
        sendBotReadyEvent(client);
    },
};
