import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { typeOrmOptions } from "./core/configs";
import { HichchiCrudModule } from "hichchi-nestjs-crud";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { HichchiAuthModule } from "hichchi-nestjs-auth";
import configuration from "./core/configs/configuration";
import { AuthField, AuthMethod } from "hichchi-nestjs-auth/auth/enums";
import { RegisterUserDto, UserModule, UserService, ViewUserDto } from "./modules/user";
import { AppConfigModule } from "./modules/app-config";
import { EmailModule } from "./modules/email";

@Module({
    imports: [
        HichchiCrudModule.forRoot(typeOrmOptions),
        HichchiAuthModule.registerAsync(
            { imports: [UserModule], useExisting: UserService },
            {
                jwt: configuration().jwt,
                redis: configuration().redis,
                authMethod: AuthMethod.JWT,
                authField: AuthField.EMAIL,
                registerDto: RegisterUserDto,
                viewDto: ViewUserDto,
            },
        ),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "uploads"),
            serveRoot: "/uploads",
        }),
        AppConfigModule,
        EmailModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
