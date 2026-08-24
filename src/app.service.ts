import { Injectable, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./core/config";
import helmet from "helmet"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class App {
  static async main() {
    const app = await NestFactory.create(AppModule);
    const PORT = env.PORT
    const prefix = '/api/v1'


    app.useGlobalPipes(new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true,
      transform : true
    }));


    const config = new DocumentBuilder()
      .setTitle('marketplace backend')
      .setDescription('online kerak usta topish uchun platforma')
      .setVersion('1.0')
      .addTag('marketplace')
      .build()
      
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${prefix}/docs`, app, documentFactory) 

    app.use(helmet())    //  headers ichida kelishi mumkin atakadan himoya, optional hamma funciyalari yoqiladi

    app.enableCors('localhost:1001')      // qaysi api dan sorov kelishini cheklaydi 

    app.setGlobalPrefix(prefix)

    await app.listen(PORT, () => console.log('server is running on port', PORT));
  }
}
