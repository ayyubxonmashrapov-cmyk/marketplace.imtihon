import bcrypt from 'bcrypt'

export class Crypt {
    static hash(data: string){
        return bcrypt.hash(data, 7)
    }

    static compare(data: string, hashedData: string){
        return bcrypt.compare(data, hashedData)
    }
}