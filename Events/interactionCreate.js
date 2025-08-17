import { checkCooldown, logCommandUsage, formatError } from '../Core/commandUtils.js';
import { sendSlashCommandUsage, sendSlashCommandError } from '../Core/slashCommandWebhook.js';
import { sendErrorToWebhook } from '../Core/errorWebhook.js';

export default {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if (typeof command.run !== "function") {
            sendErrorToWebhook(new Error(`Command ${interaction.commandName} does not have a run() function.`), {
                commandName: interaction.commandName,
                user: interaction.user,
                guild: interaction.guild
            });
            return;
        }

        const cooldownResult = checkCooldown(interaction.user.id, interaction.commandName, command.cooldown || 3000);
        if (cooldownResult.onCooldown) {
            return interaction.reply({
                content: `⏰ Please wait ${cooldownResult.timeLeft} seconds before using this command again.`,
                flags: 64 
            });
        }

        logCommandUsage(interaction.user, interaction.commandName, interaction.guild?.name || 'DM');

        sendSlashCommandUsage(interaction.user, interaction.commandName, interaction.guild?.name || 'DM');

        try {
            await command.run(client, interaction);
        } catch (error) {
            const errorInfo = formatError(error, interaction.commandName);

            sendSlashCommandError(error, {
                commandName: interaction.commandName,
                user: interaction.user,
                guild: interaction.guild
            });

            sendErrorToWebhook(error, {
                commandName: interaction.commandName,
                user: interaction.user,
                guild: interaction.guild
            });

            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({
                        content: "❌ Error executing command! Please try again later.",
                        flags: 64
                    });
                } catch (replyError) {
                }
            }
        }
    },
};
