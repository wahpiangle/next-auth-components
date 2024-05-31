"use client"
import { useCurrentUser } from "@/hooks/use-current-user"

const SettingsPage = () => {
    const { user, status } = useCurrentUser();

    return (
        <div className="bg-white p-10 rounded-xl">
            <form>
                <button type="submit">Sign Out</button>
            </form >
        </div>
    )
}

export default SettingsPage