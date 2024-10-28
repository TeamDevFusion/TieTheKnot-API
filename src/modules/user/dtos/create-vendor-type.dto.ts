import { IsNotEmpty } from "class-validator";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiProperty } from "@nestjs/swagger";
import { UserErrors } from "../responses";
import { IVendorDto } from "../interfaces";
import { sbVendorType } from "../../../swagger/utils/swagger-request";

export class CreateVendorTypeDto implements IVendorDto {
    @ApiProperty({ example: sbVendorType.name })
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PARTNER_FNAME))
    name: string;
}
