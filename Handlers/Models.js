import fs from "fs";
import path from "path";

export default async () => {
    const modelsPath = path.join(process.cwd(), "Models");
    if (!fs.existsSync(modelsPath)) return 0;
    const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith(".js"));
    for (const file of modelFiles) {
        await import(`../Models/${file}`);
    }
    return modelFiles.length;
};
