"use client"
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user"

const SettingsPage = () => {
    const { user, status } = useCurrentUser();
    const onSignOut = () => {
        logout();
    }
    return (
        <form>
            {
                status === 'loading' ?
                    <p>Loading...</p>
                    :
                    <p>{user?.email}</p>
            }

            <button onClick={onSignOut} type="submit">Sign Out</button>
        </form >
    )
}

export default SettingsPage