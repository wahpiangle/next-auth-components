import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = db.twoFactorToken.findUnique({
            where: {
                token
            }
        });
        return twoFactorToken;
    } catch (error) {
        console.error("Error in getTwoFactorTokenByToken: ", error);
        return null;
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = db.twoFactorToken.findFirst({
            where: {
                email
            }
        });
        return twoFactorToken;
    } catch (error) {
        console.error("Error in getTwoFactorTokenByEmail: ", error);
        return null;
    }
}

export const deleteTwoFactorToken = async (id: string) => {
    try {
        await db.twoFactorToken.delete({
            where: {
                id
            }
        });
        return true;
    } catch (error) {
        console.error("Error in deleteTwoFactorToken: ", error);
        return false;
    }
}