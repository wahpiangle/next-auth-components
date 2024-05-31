"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_RERDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerficationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerficationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { deleteTwoFactorToken, getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { createTwoFactorConfirmation, deleteTwoFactorConfirmation, getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) return {
        error: "Invalid fields"
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) { //no password = not using credentials
        return {
            error: "Invalid Credentials"
        }
    }

    if (!existingUser.emailVerified) {
        const verficationToken = await generateVerficationToken(existingUser.email);
        await sendVerficationEmail(existingUser.email, verficationToken.token);
        return {
            success: "Confirmation email sent. Please verify your email address."
        }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorToken || twoFactorToken.token !== code) {
                return {
                    error: "Invalid code!"
                }
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return {
                    error: "Code has expired"
                }
            }

            await deleteTwoFactorToken(twoFactorToken.id);

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if (existingConfirmation) {
                await deleteTwoFactorConfirmation(existingConfirmation.id);
            }

            await createTwoFactorConfirmation(existingUser.id);
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);
            return {
                twoFactor: true,
            }
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_RERDIRECT,
        });
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials"
                    }
                default:
                    return {
                        error: "Something went wrong"
                    }
            }
        }
        throw e;
    }
}