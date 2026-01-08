import mongoose from "mongoose";

let isConnected: boolean = false;

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
const MONGODB_NAME: string | undefined = process.env.MONGODB_NAME;

async function connectToDB(): Promise<void> {
    if (!MONGODB_URI) {
        throw new Error("MongoDB URI is missing");
    }

    if (isConnected) return;

    if (mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {dbName: MONGODB_NAME});
        console.log(`MongoDB Connected on ${MONGODB_NAME}`);
    } catch (e) {
        console.error(`ERROR while Created and Connected in MongoDB ${MONGODB_NAME || MONGODB_URI}`, e);
    }
}

await connectToDB();