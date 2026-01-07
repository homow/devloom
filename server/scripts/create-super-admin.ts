import 'ts-node/register';
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import promptSync from "prompt-sync";
import {UserRole} from "@src/types/models/auth.js";
import {UserModel} from "@src/models/User.model.js";

dotenv.config({path: "../.env", quiet: true});
const prompt = promptSync();

async function main() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in the environment");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`Connected to DB ${process.env.MONGODB_URI}`);

        const existing = await UserModel.findOne({
            role: UserRole.SUPER_ADMIN
        });

        if (existing) {
            console.error("super admin already exists", existing.email);
            process.exit(0);
        }

        console.log(`creating super admin...`);

        const email: string = prompt("Enter email address: ");
        const password: string = prompt("Enter password: ", {echo: "*"});

        const hashed: string = await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            email,
            password: hashed,
            role: UserRole.SUPER_ADMIN,
            name: "super admin"
        });
        console.log("✅ Super admin created:", user.email);
        process.exit(0);
    } catch (e) {
        console.log("Error: ", e);
        process.exit(1);
    }
}

await main();