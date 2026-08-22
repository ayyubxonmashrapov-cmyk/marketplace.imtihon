import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../core/database/prisma.service";
import { CreateAdminDto } from "./dto/sign-in.dto";
import { Crypt } from "../../infrastructure/lib/Crypt";
import { successRes } from "../../common/helper/success-responce";

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService){ }

    async create(dto: CreateAdminDto) {
        const { password } = dto;

        let phone1 = dto.phone

        const phone = phone1.startsWith('+') ? phone1 : '+' + phone1

        const isExistPhone = await this.prisma.user.findFirst({ where: { phone } })

        if (isExistPhone){
            throw new ConflictException('Phone number is already exists')
        }

        const hashedPassword = await Crypt.hash(password)

        const user = await this.prisma.user.create({
            data : {
                phone,
                hashedPassword,
            }
        });

        await this.prisma.admin.create({
            data : {
                userId : user.id,
            }
        });

        return successRes(user, 201)
    }
}