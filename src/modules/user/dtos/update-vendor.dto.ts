import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IUserDto, IVendor } from "../interfaces";
import { UpdateUserDto } from "./update-user.dto";
import { sbVendor } from "../../../swagger/utils/swagger-request";

export class UpdateVendorDto extends UpdateUserDto implements Partial<IUserDto>, Partial<IVendor> {
    @ApiPropertyOptional({ example: sbVendor.vendorTypeId })
    @IsOptional()
    vendorTypeId?: string;

    @ApiPropertyOptional({ example: sbVendor.companyName })
    @IsOptional()
    companyName?: string;

    @ApiPropertyOptional({ example: sbVendor.address })
    @IsOptional()
    address?: string;

    @ApiPropertyOptional({ example: sbVendor.city })
    @IsOptional()
    city?: string;

    @ApiPropertyOptional({ example: sbVendor.phone })
    @IsOptional()
    phone?: string;
}
