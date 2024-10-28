import { IsEnum, IsOptional } from "class-validator";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PlanStatus } from "../enums";
import { UserErrors } from "../responses";
import { IClient, IUserDto } from "../interfaces";
import { UpdateUserDto } from "./update-user.dto";
import { sbClient } from "../../../swagger/utils/swagger-request";

export class UpdateClientDto extends UpdateUserDto implements Partial<IUserDto>, Partial<IClient> {
    @ApiPropertyOptional({ enum: Object.values(PlanStatus), example: PlanStatus.Planning })
    @IsEnum(PlanStatus, toErrString(UserErrors.USER_400_INVALID_PLAN_STATUS))
    @IsOptional()
    planStatus?: PlanStatus;

    @ApiPropertyOptional({ example: sbClient.partnerFirstName })
    @IsOptional()
    partnerFirstName?: string;

    @ApiPropertyOptional({ example: sbClient.partnerLastName })
    @IsOptional()
    partnerLastName?: string;
}
