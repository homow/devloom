import type {
    BaseDB,
    UserDB,
    CategoryDB,
    SafeBaseDB,
    SafeUserDB,
    SafeCategoryDB,
    ServiceResponse, CourseDB, SafeCourseDB,
} from "@src/types/index.js";
import mongoose, {Types} from "mongoose";

function base<T extends BaseDB>(data: T): SafeBaseDB {
    return {
        id: data._id?.toString(),
        createdAt: data.createdAt?.toISOString(),
        updatedAt: data.updatedAt?.toISOString(),
    };
}

export function getSafeUser(data: UserDB): SafeUserDB {
    const baseData = base(data);
    return {
        ...baseData,
        name: data.name,
        email: data.email,
        role: data.role,
    };
}

export function getSafeCategory(data: CategoryDB): SafeCategoryDB {
    const baseData = base(data);
    return {
        ...baseData,
        title: data.title,
        href: data.href,
    };
}

export function getSafeCourse(data: CourseDB): SafeCourseDB {
    const baseData = base(data);

    return {
        ...baseData,
        title: data.title,
        description: data.description,
        price: data.price,
        cover: data.cover,
        support: data.support,
        href: data.href,
        discount: data.discount,
        teacher: data.teacher.toString(),
        category: data.category.toString(),
        status: data.status,
    };
}

export function checkObjectID(id: string | Types.ObjectId, key?: string): ServiceResponse | null {
    const isValidID: boolean = mongoose.isValidObjectId(id);

    const msg: string = `${key !== undefined ? key : ""} ID is invalid.`;
    const cd: string = `${key ? key.toUpperCase() + "_" : ""}ID_OBJECT_INVALID`;

    if (!isValidID) return {
        status: 400,
        data: {
            ok: false,
            message: msg.trim(),
            code: cd.trim(),
        }
    };

    return null;
}