import { Module } from "@nestjs/common";
import { ConfigService, UserLogService } from "./services";
import { HichchiCrudModule } from "hichchi-nestjs-crud";
import { ConfigEntity, UserLogEntity } from "./entities";
import { ConfigRepository, UserLogRepository } from "./repositories";
import { RedisCacheModule } from "hichchi-nestjs-common/cache";
import { ConfigController } from "./controllers";

@Module({
    controllers: [ConfigController],
    imports: [HichchiCrudModule.forFeature([ConfigEntity, UserLogEntity]), RedisCacheModule],
    providers: [ConfigService, ConfigRepository, UserLogService, UserLogRepository],
    exports: [ConfigService, ConfigRepository, UserLogService, UserLogRepository],
})
export class AppConfigModule {}
