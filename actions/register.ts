"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/data/user";

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

    // TODO: send verfication token email

    return {
        success: "User Created!"
    }

}