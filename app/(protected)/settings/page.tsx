import { auth, signOut } from "@/auth"

const SettingsPage = async () => {
    const session = await auth();
    return (
        <form action={
            async () => {
                "use server"
                await signOut()
            }}>
            <button type="submit">Sign Out</button>
        </form >
    )
}

export default SettingsPage