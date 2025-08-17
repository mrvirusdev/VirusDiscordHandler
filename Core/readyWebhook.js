import { WebhookClient } from 'discord.js';
import config from '../config.js';

let webhookClient = null;

if (config.readyWebhook) {
    try {
        webhookClient = new WebhookClient({ url: config.readyWebhook });
    } catch (error) {
    }
}

export async function sendBotReadyEvent(client) {
    if (!webhookClient) return;

    try {
        const embed = {
            color: 0x00FF00, 
            title: '🟢 Bot is Online!',
            description: `**Bot:** ${client.user.tag}\n**Status:** Online and Ready`,
            fields: [
                {
                    name: '🤖 Bot Info',
                    value: `**ID:** ${client.user.id}\n**Tag:** ${client.user.tag}`,
                    inline: true
                },
                {
                    name: '🏠 Servers',
                    value: `${client.guilds.cache.size.toLocaleString()} servers`,
                    inline: true
                },
                {
                    name: '👥 Users',
                    value: `${client.users.cache.size.toLocaleString()} users`,
                    inline: true
                },
                {
                    name: '⚡ Commands',
                    value: `**Slash:** ${client.commands.size}\n**Prefix:** ${client.prefixCommands.size}`,
                    inline: true
                },
                {
                    name: '📅 Started At',
                    value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                    inline: true
                },
                {
                    name: '⏰ Uptime',
                    value: `<t:${Math.floor(Date.now() / 1000)}:R>`,
                    inline: true
                }
            ],
            thumbnail: {
                url: client.user.displayAvatarURL({ dynamic: true, size: 256 })
            },
            footer: {
                text: 'Kanna Bot • System Logger'
            },
            timestamp: new Date().toISOString()
        };

        await webhookClient.send({
            embeds: [embed]
        });
    } catch (webhookError) {
    }
}
