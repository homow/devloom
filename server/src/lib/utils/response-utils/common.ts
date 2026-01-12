import type {BaseDB, CategoryDB, UserDB} from "@src/types/index.js";

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