import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { PlanStatus } from "../enums";
import { toErrString } from "hichchi-nestjs-common/converters";
import { UserErrors } from "../responses";
import { ICreateClientDto } from "../interfaces";
import { sbRegClient } from "../../../swagger/utils/swagger-request";

export class RegisterClientDto implements ICreateClientDto {
    @ApiProperty({ enum: Object.values(PlanStatus), example: sbRegClient.planStatus })
    @IsEnum(PlanStatus, { message: "Invalid plan status" })
    @IsNotEmpty({ message: "Plan status must not be empty" })
    planStatus: PlanStatus;

    @ApiProperty({ example: sbRegClient.partnerFirstName })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_FNAME))
    partnerFirstName: string;

    @ApiProperty({ example: sbRegClient.partnerLastName })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_LNAME))
    partnerLastName: string;
}
