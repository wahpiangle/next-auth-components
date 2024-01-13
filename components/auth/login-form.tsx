import { CardHeader } from "../ui/card"
import { CardWrapper } from "./card-wrapper"
import { Header } from "./header"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Create an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <CardHeader>
                <Header label="Sign in to your account" />
            </CardHeader>

        </CardWrapper>
    )
}