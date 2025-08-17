import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import config from '../../../config.js';
import dotenv from 'dotenv';
import emojis from '../../../Core/emojis.js';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(config.token);

export default {
  dir: "Public", 
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Show bot latency and API response times'),

  run: async (client, interaction) => {
    const start = Date.now();
    await interaction.deferReply();

    const restStart = Date.now();
    await rest.get('/users/@me');
    const restEnd = Date.now();

    const end = Date.now();

    const botLatency = end - start;

    const embed = new EmbedBuilder()
      .setTitle(`${emojis.success} Pong!`)
      .setColor('Green')
      .addFields(
        {
          name: `${emojis.bot} Bot Latency`,
          value: `\`${botLatency}ms\``,
          inline: true,
        },
        {
          name: `${emojis.ws} WebSocket Latency`,
          value: `\`${client.ws.ping}ms\``,
          inline: true,
        },
        {
          name: `${emojis.rest} REST API Latency`,
          value: `\`${restEnd - restStart}ms\``,
          inline: true,
        }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};
