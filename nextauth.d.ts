



declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            role: string;
            image?: string;
        } & DeafaultSession['user']
    }
}