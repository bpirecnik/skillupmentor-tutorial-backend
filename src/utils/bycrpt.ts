import { InternalServerErrorException } from "@nestjs/common"
import * as bycrpt from 'bcrypt'
import Logging from "library/Logging"

export const hash = async (data:string, salt= 10): Promise<string> => {
    try {
        const generatedSalt = await bycrpt.genSalt(salt)
        return bycrpt.hash(data, generatedSalt)
    } catch (error) {
        Logging.error(error)
        throw new InternalServerErrorException('Something went wrong while hashing password.')
    }
}

export const compareHash = async (data: string | Buffer, encryptedData: string): Promise<boolean> => {
    try {
        return bycrpt.compare(data, encryptedData)
    } catch (error) {
        Logging.error(error)
        throw new InternalServerErrorException('Something went wrong while comparing hash.')
    }
}