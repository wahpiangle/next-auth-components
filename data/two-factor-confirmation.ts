import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = db.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        });
        return twoFactorConfirmation;
    } catch (error) {
        console.error("Error in getTwoFactorConfirmationByUserId: ", error);
        return null;
    }
}

export const deleteTwoFactorConfirmation = async (id: string) => {
    try {
        await db.twoFactorConfirmation.delete({
            where: {
                id
            }
        });
        return true;
    } catch (error) {
        console.error("Error in deleteTwoFactorConfirmation: ", error);
        return false;
    }
}

export const createTwoFactorConfirmation = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.create({
            data: {
                userId
            }
        });
        return twoFactorConfirmation;
    } catch (error) {
        console.error("Error in createTwoFactorConfirmation: ", error);
        return null;
    }
}