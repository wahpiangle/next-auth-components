import * as z from "zod"

export const SettingsSchema = z.object({
    name: z.optional(z.string())
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(1, {
        message: "Please enter a valid password",
    }),
    code: z.optional(z.string()),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string()
})
