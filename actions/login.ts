"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_RERDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerficationToken } from "@/lib/tokens";
import { sendVerficationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) return {
        error: "Invalid fields"
    }

    const { email, password } = validatedFields.data;
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