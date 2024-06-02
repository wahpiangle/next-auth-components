"use client"
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    const { user, status } = useCurrentUser();
    return (
        <>
            {
                status === "loading" ? <p>Loading...</p> :
                    <UserInfo user={user} label="Client" />
            }
        </>
    )
}

export default ClientPage
