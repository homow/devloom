import type {BaseDB} from "./index.js";

export interface CategoryDB extends BaseDB {
    title: string;
    href: string;
}