export type User = {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
    username: string;
    email: string;
    emailVerified: boolean;
    password: string;
    image: string;
    hashedPassword: string;
    role: string;
    accounts: any[];
    orders: any[];
    reviews: any[];
}