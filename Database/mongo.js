import mongoose from "mongoose";
import config from "../config.js";

export default async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return true;
    } catch {
        return false;
    }
};
