import 'ts-node/register';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import promptSync from "prompt-sync";
import {UserSchema} from "@validators/user.js";
import {UserModel} from "@models/User.model.js";
import {UserRole} from "@src/types/models/auth.js";

dotenv.config({path: "../.env", quiet: true});
const prompt = promptSync();

async function askValidated<T extends keyof typeof UserSchema.shape>(
    field: T,
    message: string,
    hidden = false
): Promise<string> {
    while (true) {
        const input: string = hidden ? prompt(message, {echo: "*"}) : prompt(message);
        const parsed = UserSchema.shape[field].safeParse(input);
        if (parsed.success) return input;
        console.error("❌ Invalid", field, "-", parsed.error.issues[0]?.message);
        console.log("↺ Please try again.");
    }
}

async function main() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in the environment");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to DB ${process.env.MONGODB_URI}`);

        const existing = await UserModel.findOne({
            role: UserRole.SUPER_ADMIN
        });

        if (existing) {
            console.error(`super admin already exists\nemail: ${existing.email}\nid: ${existing._id}\nrole: ${existing.role}`);
            process.exit(0);
        }

        console.log(`creating super admin...`);

        const email: string = await askValidated("email", "Enter email address: ");
        const password: string = await askValidated("password", "Enter password: ", true);

        const hashed: string = await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            email,
            password: hashed,
            role: UserRole.SUPER_ADMIN,
            name: "super admin"
        });
        console.log(`✅ Super admin created:\nemail: ${user.email}\nid: ${user._id}\nrole: ${user.role}`);
        process.exit(0);
    } catch (e) {
        console.log("❌ Error: ", e);
        process.exit(1);
    }
}

await main();