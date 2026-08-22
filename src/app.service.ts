import { Injectable } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./core/config";

@Injectable()
export class App {
  static async main() {
    const app = await NestFactory.create(AppModule);
    const PORT = env.PORT

    app.setGlobalPrefix('/api/v1')

    await app.listen(PORT, () => console.log('server is running on port', PORT));
  }
}
