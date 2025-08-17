import { sendErrorToWebhook } from '../Core/errorWebhook.js';

export default {
    name: "error",
    execute(error, client) {
        sendErrorToWebhook(error, {
            eventName: 'error',
            guild: client.guilds?.cache?.first(),
            user: client.user
        });
    },
}; 