"use server"

import { getUserByEmail } from "@/data/user"
import { getVerficationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

export const newVerification = async (token: string) => {
    const existingToken = await getVerficationTokenByToken(token);
    if (!existingToken) return {
        error: "Token does not exist!"
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return {
        error: "Token has expired!"
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return {
        error: "User does not exist!"
    }

    await db.user.update({
        where: {
            email: existingToken.email
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    })

    await db.verficationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {
        success: "Email verified!"
    }
}