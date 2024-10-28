import { IsEnum, IsNotEmpty } from "class-validator";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { PlanStatus } from "../enums";
import { UserErrors } from "../responses";
import { IClient, IUserDto } from "../interfaces";
import { sbClient } from "../../../swagger/utils/swagger-request";

export class CreateClientDto extends CreateUserDto implements IUserDto, IClient {
    @ApiProperty({ enum: Object.values(PlanStatus), example: PlanStatus.Planning })
    @IsEnum(PlanStatus, toErrString(UserErrors.USER_400_INVALID_PLAN_STATUS))
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PLAN_STATUS))
    planStatus: PlanStatus;

    @ApiProperty({ example: sbClient.partnerFirstName })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_FNAME))
    partnerFirstName: string;

    @ApiProperty({ example: sbClient.partnerLastName })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_LNAME))
    partnerLastName: string;
}
