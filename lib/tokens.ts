import { v4 as uuidv4 } from 'uuid';
import crypt from "crypto";
import { db } from './db';
import { deleteVerficationToken, getVerficationTokenByEmail } from '@/data/verification-token';
import { deletePasswordResetToken, getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { deleteTwoFactorToken, getTwoFactorTokenByEmail } from '@/data/two-factor-token';

export const generateVerficationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60) // 1 hour
    const existingToken = await getVerficationTokenByEmail(email)
    if (existingToken) {
        await deleteVerficationToken(existingToken.id)
    }
    const verficationToken = await db.verficationToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return verficationToken
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60) // 1 hour
    const existingToken = await getPasswordResetTokenByEmail(email)
    if (existingToken) {
        await deletePasswordResetToken(existingToken.id)
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return passwordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
    const token = crypt.randomInt(100_000, 1_000_000).toString() // 6 digit number
    const expires = new Date(new Date().getTime() + 1000 * 60 * 10) // 10 minutes
    const existingToken = await getTwoFactorTokenByEmail(email)

    if (existingToken) {
        await deleteTwoFactorToken(existingToken.id)
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return twoFactorToken;
}   