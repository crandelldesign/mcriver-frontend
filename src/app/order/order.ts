import { Item } from "../product/item";
import { User } from "../user/user";

export class Order {
    id: number;
    email: string;
    phone: string;
    total: number = 0;
    items: Array<Item>;
    persons: Array<any>;
    user: User;
}
