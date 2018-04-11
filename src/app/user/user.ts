export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    isAdmin: boolean = false;
    isActive: boolean = true;
    loggedIn: boolean = false;
}
