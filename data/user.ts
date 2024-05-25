import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

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

export const resetUserPassword = async (id: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await db.user.update({
            where: {
                id
            },
            data: {
                password: hashedPassword
            }
        });
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}