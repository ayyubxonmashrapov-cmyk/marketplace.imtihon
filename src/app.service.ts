import { Injectable, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./core/config";
import helmet from "helmet"

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

    app.use(helmet())    

    app.setGlobalPrefix(prefix)

    await app.listen(PORT, () => console.log('server is running on port', PORT));
  }
}
