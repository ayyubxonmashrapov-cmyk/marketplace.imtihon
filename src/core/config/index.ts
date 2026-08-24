import { config } from 'dotenv';
import { access } from 'fs';

config()

export const env = {
    PORT : Number(process.env.PORT),
    DB_URI : String(process.env.DB_URI),
    SUPERADMIN : {
        PHONE : String(process.env.SUPERADMIN_PHONE),
        PASSWORD : String(process.env.SUPERADMIN_PASSWORD)
    },
    TOKEN : {
        ACCESS_KEY : String(process.env.ACCESS_TOKEN_KEY),
        ACCESS_TIME :String(process.env.ACCESS_TOKEN_TIME),
        REFRESH_KEY :String(process.env.REFRESH_TOKEN_KEY),
        REFRESH_TIME :String(process.env.REFRESH_TOKEN_TIME)
    }
}