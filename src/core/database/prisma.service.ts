import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config";
import { PrismaClient } from "../../../generated/prisma/client";
import { AdminRoles } from "../../common/enum";
import { Crypt } from "../../infrastructure/lib/Crypt";

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy{
    
    private readonly logger = new Logger(PrismaService.name)

    constructor(){
        const adapter = new PrismaPg({
            connectionString : env.DB_URI
        })

        super({
            adapter
        })
    }

    async onModuleInit(): Promise<void> {             //promice nimaga kerak ekanligini bilmiman
        await this.$connect()
        this.logger.log('database is connected')


        const isSuperAdmin = await this.admin.findFirst({
            where : { 
                role : AdminRoles.SUPERADMIN
            }
        });

        if (!isSuperAdmin){
            const user = await this.user.create({
                data : {
                    phone : env.SUPERADMIN.PHONE,
                    hashedPassword : await Crypt.hash(env.SUPERADMIN.PASSWORD),
                    fullName : 'Full Name'
                }
            });

            await this.admin.create({
                data : {
                    userId : user.id,
                    role : AdminRoles.SUPERADMIN
                }
            })

            await this.platformUserRole.create({
                data : {
                    userId : user.id,
                    roleCode : AdminRoles.SUPERADMIN
                }
            });

            console.log('Superadmin is created')
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect()
        this.logger.log('database is disconnected')
    }
}
