import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IVendorDto } from "../interfaces";
import { sbVendorType } from "../../../swagger/utils/swagger-request";

export class UpdateVendorTypeDto implements Partial<IVendorDto> {
    @ApiPropertyOptional({ example: sbVendorType.name })
    @IsOptional()
    name?: string;
}
