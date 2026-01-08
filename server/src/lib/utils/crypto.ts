import {createHash} from 'crypto';
import type {StringValue} from "ms";
import {hash, compare} from "bcrypt";
import jwt, {type JwtPayload, type SignOptions} from "jsonwebtoken";

async function hashSecret(
    value: string,
    saltRounds: number = 12
): Promise<string> {
    return hash(value, saltRounds);
}

async function compareSecret(
    value: string,
    hashed: string
): Promise<boolean> {
    return await compare(value, hashed);
}

function hashSecretToken(value: string): string {
    return createHash('sha256').update(value).digest('hex');
}

function compareSecretToken(value: string, hashed: string) {
    return hashSecretToken(value) === hashed;
}

function generateToken(
    payload: Record<string, unknown>,
    expiresIn: number | StringValue = "24h"
): string {
    const secret: string | undefined = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "JWT_SECRET is not defined in environment variables"
        );
    }

    const options: SignOptions = {expiresIn};

    return jwt.sign(payload, secret, options);
}

function verifyToken(
    token: string
): JwtPayload {
    const secret: string | undefined = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "JWT_SECRET is not defined in environment variables"
        );
    } else {
        try {
            return jwt.verify(token, secret) as JwtPayload;
        } catch (_) {
            throw new Error("Invalid or expired token");
        }
    }
}

function decodeToken(
    token: string
): string | JwtPayload | null {
    return jwt.decode(token);
}

export {
    generateToken,
    hashSecret,
    compareSecret,
    verifyToken,
    decodeToken,
    hashSecretToken,
    compareSecretToken
};