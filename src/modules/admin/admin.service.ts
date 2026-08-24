import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../core/database/prisma.service";
import { AdminDto } from "./dto/admin.dto";
import { Crypt } from "../../infrastructure/lib/Crypt";
import { successRes } from "../../common/helper/success-responce";
import { IPayload } from "../../common/interface/payloud-token";
import { SignInDto } from "./dto/signIn.dto";
import { AdminRoles } from "../../common/enum";
import { Token } from "../../infrastructure/lib/Token";
import { Response } from 'express'
import { env } from "../../core/config";
import { ISuccess } from "../../common/interface/ISeccess.interface";

@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async create(dto: AdminDto) {
        const password = dto.password;

        let phone1 = dto.phone

        const phone = phone1.startsWith('+') ? phone1 : '+' + phone1

        const isExistPhone = await this.prisma.user.findFirst({ where: { phone } })

        if (isExistPhone) {
            throw new ConflictException('Phone number is already exists')
        }

        const hashedPassword = await Crypt.hash(password)

        const user = await this.prisma.user.create({
            data: {
                phone,
                hashedPassword,
            }
        });

        await this.prisma.admin.create({
            data: {
                userId: user.id,
            }
        });

        await this.prisma.platformUserRole.create({
            data : {
                userId : user.id,
                roleCode : AdminRoles.ADMIN
            }
        })

        return successRes(user, 201)    // to controleer 
    }

    async signIn(dto: SignInDto, res : Response): Promise<ISuccess> {
        const password = dto.password;
        let phone1 = dto.phone;

        const phone = phone1.startsWith('+') ? phone1 : '+' + phone1;

        const user = await this.prisma.user.findUnique({ where: { phone } })

        const isMatchPass = await Crypt.compare(password, user ? user.hashedPassword : '')

        if (!user || !isMatchPass) {
            throw new NotFoundException('Phone or password is wrong')
        }

        const userRole = await this.prisma.platformUserRole.findFirst({ where : { userId : user?.id }})

        if(!userRole){
            throw new NotFoundException('user doesnt have a role')
        }

        const payloud : IPayload = { id : user.id , status : user.status , role : userRole.roleCode }

        const accessToken = await Token.generateAccess(payloud)
        const refreshToken = await Token.generateRefresh(payloud)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,   // only on dev mod, production false
            secure : false,
            maxAge : parseInt(env.TOKEN.REFRESH_TIME ) * 24 * 60 * 60 * 1000 
        });
        
        return successRes({
            data : { refreshToken },
            statusCode : 201
        })
    }
}