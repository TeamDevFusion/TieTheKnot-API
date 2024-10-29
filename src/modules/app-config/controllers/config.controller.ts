import { Controller, Get, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { Endpoint } from "../../../core/enums";
import { JwtAuthGuard, RoleGuard } from "hichchi-nestjs-auth/auth/guards";
import { UserLogService } from "../services";
import { UserLogEntity } from "../entities";
import { Roles } from "hichchi-nestjs-auth/auth/decorators";
import { Role } from "../../../core/enums/role.enum";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ApiDocs } from "../../../swagger/decorators";
import { srE400, srE401, srE404 } from "../../../swagger/utils/swagger-responses";
import { createReadStream } from "fs";
import { join } from "path";
import { LOG_FILE_NAME } from "hichchi-nestjs-common/services";
import { Response } from "express";

@Controller(Endpoint.CONFIG)
@ApiTags("Config")
@ApiBearerAuth()
@ApiBadRequestResponse(srE400)
@ApiUnauthorizedResponse(srE401)
@ApiNotFoundResponse(srE404)
@UseGuards(JwtAuthGuard, RoleGuard)
export class ConfigController {
    constructor(private readonly userLogService: UserLogService) {}

    @Get("logs")
    @Roles(Role.ADMIN)
    @ApiDocs("Get logs")
    async logs(): Promise<UserLogEntity[]> {
        return await this.userLogService.getAll();
    }

    @Get("errors")
    @Roles(Role.ADMIN)
    @ApiDocs("Get logs")
    errors(@Res({ passthrough: true }) res: Response): StreamableFile {
        const file = createReadStream(join(process.cwd(), LOG_FILE_NAME));
        res.set({
            "Content-Type": "application/json",
            "Content-Disposition": `attachment; filename="${LOG_FILE_NAME}"`, // Add the .json extension here
        });
        return new StreamableFile(file);
    }
}
