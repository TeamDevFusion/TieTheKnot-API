import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "hichchi-nestjs-common/filters";
import { ClassSerializerInterceptor, UnauthorizedException, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import configuration from "./core/configs/configuration";
import * as process from "process";
import { isOriginAllowed } from "hichchi-nestjs-common/utils";
import { setupSwagger } from "./swagger/utils/swagger.core-utils";

// eslint-disable-next-line func-style
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.use(cookieParser(configuration().cookies.secret));

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || isOriginAllowed(origin, configuration().app.allowedOrigins)) {
                callback(null, true);
            } else {
                callback(new UnauthorizedException());
            }
        },
        credentials: true,
    });

    app.setGlobalPrefix(`${configuration().app.version}`);

    setupSwagger(app);

    await app.listen(configuration().app.port);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();

process.on("uncaughtException", err => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
