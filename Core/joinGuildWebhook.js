import { WebhookClient } from 'discord.js';
import config from '../config.js';

let webhookClient = null;

if (config.joinGuildWebhook) {
    try {
        webhookClient = new WebhookClient({ url: config.joinGuildWebhook });
    } catch (error) {
    }
}

export async function sendGuildJoinEvent(guild, client) {
    if (!webhookClient) return;

    try {
        const embed = {
            color: 0x57F287,
            title: '🎉 Bot Joined New Server!',
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
                    name: '📅 Joined At',
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
                    name: '📊 Total Servers',
                    value: `${client.guilds.cache.size} servers`,
                    inline: true
                }
            ],
            thumbnail: {
                url: guild.iconURL({ dynamic: true, size: 256 }) || 'https:cdn.discordapp.com/embed/avatars/0.png'
            },
            footer: {
                text: 'Kanna Bot • Guild Join Logger'
            },
            timestamp: new Date().toISOString()
        };

        await webhookClient.send({
            embeds: [embed]
        });
    } catch (webhookError) {
    }
}
