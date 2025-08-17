import { WebhookClient } from 'discord.js';
import config from '../config.js';

let webhookClient = null;

if (config.leaveGuildWebhook) {
    try {
        webhookClient = new WebhookClient({ url: config.leaveGuildWebhook });
    } catch (error) {
    }
}

export async function sendGuildLeaveEvent(guild, client) {
    if (!webhookClient) return;

    try {
        const embed = {
            color: 0xFF0000,
            title: '👋 Bot Left Server',
            description: `**Server:** ${guild.name}\n**ID:** ${guild.id}`,
            fields: [
                {
                    name: '👑 Owner',
                    value: `<@${guild.ownerId}>`,
                    inline: true
                },
                {
                    name: '👥 Members',
                    value: `${guild.memberCount.toLocaleString()} members`,
                    inline: true
                },
                {
                    name: '📅 Left At',
                    value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                    inline: true
                },
                {
                    name: '🌍 Region',
                    value: guild.preferredLocale || 'Unknown',
                    inline: true
                },
                {
                    name: '🔒 Verification',
                    value: guild.verificationLevel.toString(),
                    inline: true
                },
                {
                    name: '📊 Remaining Servers',
                    value: `${client.guilds.cache.size} servers`,
                    inline: true
                }
            ],
            thumbnail: {
                url: guild.iconURL({ dynamic: true, size: 256 }) || 'https:cdn.discordapp.com/embed/avatars/0.png'
            },
            footer: {
                text: 'Kanna Bot • Guild Leave Logger'
            },
            timestamp: new Date().toISOString()
        };

        await webhookClient.send({
            embeds: [embed]
        });
    } catch (webhookError) {
    }
}
