import { IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IUpdateVendorTypeDto } from "../interfaces";
import { sbVendorType } from "../../../swagger/utils/swagger-request";
import { Transform } from "class-transformer";
import { FileOrTextFormFieldTransformer } from "hichchi-nestjs-common/transformers";

export class UpdateVendorTypeDto implements IUpdateVendorTypeDto {
    @ApiPropertyOptional({ example: sbVendorType.name })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: sbVendorType.label })
    @IsOptional()
    label?: string;

    @ApiProperty({ example: sbVendorType.icon })
    @Transform(FileOrTextFormFieldTransformer)
    @IsOptional()
    icon?: string;
}
