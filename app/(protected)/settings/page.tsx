"use client"

import { logout } from "@/actions/logout"

const SettingsPage = () => {
    const handleLogout = () => {
        logout();
    }
    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default SettingsPage