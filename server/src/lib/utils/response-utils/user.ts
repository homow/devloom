import type {UserDB} from "@src/types/index.js";

export function getSafeUser(data: UserDB) {
    return {
        id: data._id?.toString(),
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt?.toISOString(),
        updatedAt: data.updatedAt?.toISOString(),
    };
}