import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { PlanStatus } from "../enums";
import { toErrString } from "hichchi-nestjs-common/converters";
import { UserErrors } from "../responses";
import { IClient } from "../interfaces";
import { sbClient } from "../../../swagger/utils/swagger-request";

export class RegisterClientDto implements IClient {
    @ApiProperty({ enum: Object.values(PlanStatus), example: PlanStatus.Planning })
    @IsEnum(PlanStatus, { message: "Invalid plan status" })
    @IsNotEmpty({ message: "Plan status must not be empty" })
    planStatus: PlanStatus;

    @ApiProperty({ example: sbClient.partnerFirstName })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_FNAME))
    partnerFirstName: string;

    @ApiProperty({ example: sbClient.partnerLastName })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_LNAME))
    partnerLastName: string;
}
