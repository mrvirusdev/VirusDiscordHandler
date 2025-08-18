import { EmbedBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import config from '../../../config.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(config.token);

export default {
  dir: "Public",
  name: 'ping',
  description: 'Show bot latency and API response times',
  run: async (client, message, args) => {
    const sent = await message.reply("⏳ Loading...");

    const restStart = Date.now();
    await rest.get('/users/@me');
    const restEnd = Date.now();

    const embed = new EmbedBuilder()
      .setTitle("🏓 Pong!")
      .setColor('Green')
      .addFields(
        {
          name: "🤖 Bot Latency",
          value: `\`${sent.createdTimestamp - message.createdTimestamp}ms\``,
          inline: true
        },
        {
          name: "📡 WebSocket Latency",
          value: `\`${client.ws.ping}ms\``,
          inline: true
        },
        {
          name: "🌐 REST API Latency",
          value: `\`${restEnd - restStart}ms\``,
          inline: true
        }
      )
      .setTimestamp();

    sent.edit({ content: '', embeds: [embed] });
  }
};
