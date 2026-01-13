import mongoose, {Types} from "mongoose";
import type {BaseDB, CategoryDB, ServiceResponse, UserDB} from "@src/types/index.js";

function base<T extends BaseDB>(data: T) {
    return {
        id: data._id?.toString(),
        createdAt: data.createdAt?.toISOString(),
        updatedAt: data.updatedAt?.toISOString(),
    };
}

export function getSafeUser(data: UserDB) {
    const baseData = base(data);
    return {
        ...baseData,
        name: data.name,
        email: data.email,
        role: data.role,
    };
}

export function getSafeCategory(data: CategoryDB) {
    const baseData = base(data);
    return {
        ...baseData,
        title: data.title,
        href: data.href,
    };
}

export function checkObjectID(id: string | Types.ObjectId, key?: string): ServiceResponse | null {
    const isValidID: boolean = mongoose.isValidObjectId(id);

    const msg = `${key !== undefined ? key : ""} ID is invalid.`;

    if (!isValidID) return {
        status: 403,
        data: {
            ok: false,
            message: msg.trim(),
            code: "INVALID_OBJECT_ID",
        }
    };

    return null;
}