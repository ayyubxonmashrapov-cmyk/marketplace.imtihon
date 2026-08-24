import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    JwtModule.register({
      global : true,
    }),
    ThrottlerModule.forRoot({
      throttlers : [
        {
          ttl : 60000,
          limit : 5
        }
      ],
      errorMessage : "Too many attempts, try again leter"
    }),
    PrismaModule,
    AdminModule,
    JwtModule
  ],

  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard // avtomatik hamma ilova route larni himoya qiladi
  }]
})
export class AppModule { }
