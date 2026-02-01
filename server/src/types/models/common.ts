export interface BaseDB {
    _id: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface SafeBaseDB {
    id: string;
    createdAt: string;
    updatedAt: string;
}