import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { IPayload } from "../../common/interface/payloud-token";
import { env } from "../../core/config";

export class Token {
    private static readonly jwt = new JwtService

    static async generateAccess(payloud: IPayload) {
        return this.jwt.signAsync(payloud, {
            secret : env.TOKEN.ACCESS_KEY,
            expiresIn : env.TOKEN.ACCESS_TIME as JwtSignOptions["expiresIn"]
        })
    }

    static async generateRefresh(payloud: IPayload) {
        return this.jwt.signAsync(payloud, {
            secret : env.TOKEN.REFRESH_KEY,
            expiresIn : env.TOKEN.REFRESH_TIME as JwtSignOptions["expiresIn"]
        })
    }
}

