import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const createUser = async (email: string, name: string, hashedPassword: string) => {
    try {
        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}