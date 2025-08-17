import { Collection } from 'discord.js';

const cooldowns = new Collection();

export function checkCooldown(userId, commandName, cooldownTime = 3000) {
    if (!cooldowns.has(commandName)) {
        cooldowns.set(commandName, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(commandName);
    const cooldownAmount = cooldownTime;

    if (timestamps.has(userId)) {
        const expirationTime = timestamps.get(userId) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return { onCooldown: true, timeLeft: Math.round(timeLeft) };
        }
    }

    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);

    return { onCooldown: false };
}

export function logCommandUsage(user, commandName, guildName) {
}

export function formatError(error, commandName) {
    return {
        message: error.message,
        stack: error.stack,
        commandName,
        timestamp: new Date().toISOString()
    };
} 