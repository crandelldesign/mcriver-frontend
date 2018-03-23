export class Item {
    id: number;
    name: string;
    short_name: string;
    price: number;
    quantity: number = 0;
    children: Array<Item>;
}
