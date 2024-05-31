"use server"
import { signOut } from "@/auth";

export const logout = async () => {
    // allows for custom logout logic in server
    await signOut();
}