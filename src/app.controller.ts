import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { srE400, srE404, srHealthCheck } from "./swagger/utils/swagger-responses";

@Controller()
@ApiTags("App")
@ApiBadRequestResponse(srE400)
@ApiNotFoundResponse(srE404)
export class AppController {
    // noinspection JSUnusedLocalSymbols
    constructor(readonly app: AppService) {}

    @Get("/health")
    @ApiOperation({ description: "Health Check" })
    @ApiOkResponse(srHealthCheck)
    health(): { status: "UP" } {
        return { status: "UP" };
    }
}
