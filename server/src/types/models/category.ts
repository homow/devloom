import type {BaseDB, SafeBaseDB} from "./index.js";

export interface CategoryDB extends BaseDB {
    title: string;
    href: string;
}

export type SafeCategory = Pick<CategoryDB, "href" | "title"> & SafeBaseDB;