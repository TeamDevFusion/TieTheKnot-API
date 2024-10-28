import { Controller, Get, UseGuards } from "@nestjs/common";
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
}
