import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                token
            }
        });
        return passwordResetToken;

    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });
        return passwordResetToken;

    } catch (error) {
        return null;
    }
}

export const deletePasswordResetToken = async (id: string) => {
    try {
        await db.passwordResetToken.delete({
            where: {
                id
            }
        });
        return true;

    } catch (error) {
        return false;
    }
}