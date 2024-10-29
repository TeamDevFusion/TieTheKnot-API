import { IsNotEmpty, IsOptional } from "class-validator";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiProperty } from "@nestjs/swagger";
import { UserErrors } from "../responses";
import { ICreateVendorTypeDto } from "../interfaces";
import { sbVendorType } from "../../../swagger/utils/swagger-request";
import { FileOrTextFormFieldTransformer } from "hichchi-nestjs-common/transformers";
import { Transform } from "class-transformer";

export class CreateVendorTypeDto implements ICreateVendorTypeDto {
    @ApiProperty({ example: sbVendorType.name })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_TYPE_400_EMPTY_NAME))
    name: string;

    @ApiProperty({ example: sbVendorType.icon })
    @Transform(FileOrTextFormFieldTransformer)
    @IsOptional(toErrString(UserErrors.USER_400_EMPTY_PARTNER_FNAME))
    icon?: string;
}
