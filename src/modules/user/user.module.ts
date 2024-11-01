import { Module } from "@nestjs/common";
import { HichchiCrudModule } from "hichchi-nestjs-crud";
import { UserEntity, VendorTypeEntity } from "./entities";
import { UserController } from "./controllers";
import { UserService, VendorTypeService } from "./services";
import { UserRepository, VendorTypeRepository } from "./repositories";
import { AppConfigModule } from "../app-config/app-config.module";
import { FileUploadModule } from "../file-upload/file-upload.module";
// import { FileUploadModule } from "../file-upload/file-upload.module";

@Module({
    imports: [
        HichchiCrudModule.forFeature([UserEntity, VendorTypeEntity]),
        // FileUploadModule,
        AppConfigModule,
        FileUploadModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository, VendorTypeService, VendorTypeRepository],
    exports: [UserService, UserRepository, VendorTypeService, VendorTypeRepository],
})
export class UserModule {}
