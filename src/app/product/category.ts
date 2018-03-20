import { Item } from "./item";

export class Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    display_order: number;
    is_no_sizes: boolean;
    items: Array<Item>;
}
