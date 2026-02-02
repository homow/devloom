import type {
    BaseDB,
    UserDB,
    CategoryDB,
    SafeBaseDB,
    SafeUserDB,
    SafeCategoryDB,
    ServiceResponse,
    SafeCourseDB,
    CoursePopulate,
} from "@src/types/index.js";
import mongoose, {Types} from "mongoose";

// get safe base data form db collection
function base<T extends BaseDB>(data: T): SafeBaseDB {
    return {
        id: data._id?.toString(),
        createdAt: data.createdAt?.toISOString(),
        updatedAt: data.updatedAt?.toISOString(),
    };
}

// get safe user data from db collection
export function getSafeUser(data: UserDB): SafeUserDB {
    const baseData = base(data);
    return {
        ...baseData,
        name: data.name,
        email: data.email,
        role: data.role,
    };
}

// get safe category data from db collection
export function getSafeCategory(data: CategoryDB): SafeCategoryDB {
    const baseData = base(data);
    return {
        ...baseData,
        title: data.title,
        href: data.href,
    };
}

// get safe course data from db collection
export function getSafeCourse(data: CoursePopulate): SafeCourseDB {
    const baseData = base(data);
    const teacher = getSafeUser(data.teacher);
    const category = getSafeCategory(data.category);

    return {
        ...baseData,
        title: data.title,
        href: data.href,
        cover: data.cover,
        category,
        teacher,
        price: data.price,
        discount: data.discount,
        status: data.status,
        support: data.support,
        description: data.description,
    };
}

// check object id and create ServiceResponse if exist
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