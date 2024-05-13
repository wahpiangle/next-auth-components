import { db } from "@/lib/db";

export const getVerficationTokenByEmail = async (email: string) => {
    try {
        const verficationToken = await db.verficationToken.findFirst({
            where: {
                email
            }
        })
        return verficationToken
    } catch {
        return null
    }
}

export const getVerficationTokenByToken = async (token: string) => {
    try {
        const verficationToken = await db.verficationToken.findUnique({
            where: {
                token: token
            }
        })
        return verficationToken
    } catch {
        return null
    }
}

export const deleteVerficationToken = async (id: string) => {
    try {
        await db.verficationToken.delete({
            where: {
                id
            }
        })
        return true
    } catch {
        return false
    }
}