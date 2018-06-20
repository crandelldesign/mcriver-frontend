import { Item } from "../product/item";
import { User } from "../user/user";

export class Order {
    id: number;
    name: string;
    email: string;
    phone: string;
    total: number = 0;
    paymentMethod: string;
    friendly_order_id: string;
    items: Array<Item>;
    persons: Array<any>;
    user: User;
}
