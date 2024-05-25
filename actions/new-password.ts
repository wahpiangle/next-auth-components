"use server";

import { deletePasswordResetToken, getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail, resetUserPassword } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if (!token) {
        return { error: "Missing token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.message };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const tokenHasExpired = new Date(existingToken.expires) < new Date();
    if (tokenHasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await resetUserPassword(existingUser.id, password);
    await deletePasswordResetToken(existingToken.id);

    return { success: "Password updated successfully!" };
}