import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { deleteVerficationToken, getVerficationTokenByEmail } from '@/data/verfication-token';

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