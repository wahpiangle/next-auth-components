"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/data/user";
import { generateVerficationToken } from "@/lib/tokens";
import { sendVerficationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) return {
        error: "Invalid fields"
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return {
        error: "Email already in use!"
    };

    const user = await createUser(email, name, hashedPassword);

    const verficationToken = await generateVerficationToken(email);
    await sendVerficationEmail(verficationToken.email, verficationToken.token);

    return {
        success: "Confirmation Email sent!"
    }

}