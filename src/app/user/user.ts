export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    isAdmin: boolean = false;
    isActive: boolean = true;
    loggedIn: boolean = false;
}
