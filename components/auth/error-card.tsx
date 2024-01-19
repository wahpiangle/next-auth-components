import React from 'react'
import { Header } from './header'
import { BackButton } from './back-button'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { CardWrapper } from './card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel='Oops! Something went wrong!'
            backButtonHref='/auth/login'
            backButtonLabel='Back to Login'
        >
            <div className='w-full flex items-center justify-center'>
                <ExclamationTriangleIcon className='text-destructive' />
            </div>
        </CardWrapper>
    )
}

export default ErrorCard