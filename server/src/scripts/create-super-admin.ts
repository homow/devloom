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

/** get prompt and validate in zod */
async function askValidated<T extends keyof typeof UserSchema.shape>(
    field: T,
    message: string,
    hidden = false
): Promise<string> {
    while (true) {
        const input: string = hidden ? prompt(message, {echo: "*"}) : prompt(message);
        const parsed = UserSchema.shape[field].safeParse(input);

        /** return data if validation successfully */
        if (parsed.success) return input;

        /** while validation successfully */
        console.error("❌ Invalid", field, "-", parsed.error.issues[0]?.message);
        console.log("↺ Please try again.");
    }
}

/** create SUPER_ADMIN user if not exist on db collection(user) */
async function main() {
    try {
        /** check URI in environment */
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in the environment");
            process.exit(1);
        }
        /** connect on db */
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

        /** hash password for db collection */
        const hashed: string = await bcrypt.hash(password, 12);

        /** created SUPER_ADMIN */
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

/** run script */
await main();