import chalk from "chalk";
import boxen from "boxen";

export const startupReport = (data) => {
    const lines = [
        `✅ Prefix Commands Loaded: ${data.prefix}`,
        `✅ Slash Commands Loaded: ${data.slash}`,
        `✅ Events Loaded: ${data.events}`,
        `✅ Models Loaded: ${data.models}`,
        `✅ AntiCrash System: ${data.anticrash ? "Active" : "Inactive"}`,
        `✅ MongoDB: ${data.mongo ? "Connected" : "Disconnected"}`
    ];

    const report = lines.map(l => {
        if (l.includes("Active")) return chalk.yellow(l);
        if (l.includes("Disconnected")) return chalk.red(l);
        return chalk.green(l);
    }).join("\n");

    const boxed = boxen(report, {
        title: chalk.blue.bold(data.name || "BOT STARTUP REPORT"),
        titleAlignment: "center",
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "cyan",
    });

    console.log(boxed);
    console.log(chalk.magentaBright(`[ ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Riyadh" })} ]`), chalk.green("Bot is now online and fully operational."));
};
