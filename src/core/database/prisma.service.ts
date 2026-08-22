import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config";
import { PrismaClient } from "../../../generated/prisma/client";

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
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect()
        this.logger.log('database is disconnected')
    }
}
