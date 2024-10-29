import { IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IUpdateVendorTypeDto } from "../interfaces";
import { sbVendorType } from "../../../swagger/utils/swagger-request";
import { Transform } from "class-transformer";
import { FileOrTextFormFieldTransformer } from "hichchi-nestjs-common/transformers";
import { toErrString } from "hichchi-nestjs-common/converters";
import { UserErrors } from "../responses";

export class UpdateVendorTypeDto implements IUpdateVendorTypeDto {
    @ApiPropertyOptional({ example: sbVendorType.name })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: sbVendorType.icon })
    @Transform(FileOrTextFormFieldTransformer)
    @IsOptional(toErrString(UserErrors.USER_400_EMPTY_PARTNER_FNAME))
    icon?: string;
}
