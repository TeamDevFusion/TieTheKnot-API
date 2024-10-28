import { IsNotEmpty } from "class-validator";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { UserErrors } from "../responses";
import { IUserDto, IVendor } from "../interfaces";
import { sbVendor } from "../../../swagger/utils/swagger-request";

export class CreateVendorDto extends CreateUserDto implements IUserDto, IVendor {
    @ApiProperty({ example: sbVendor.vendorTypeId })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_TYPE))
    vendorTypeId: string;

    @ApiProperty({ example: sbVendor.companyName })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_COMPANY_NAME))
    companyName: string;

    @ApiProperty({ example: sbVendor.address })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_ADDRESS))
    address: string;

    @ApiProperty({ example: sbVendor.city })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_CITY))
    city: string;

    @ApiProperty({ example: sbVendor.phone })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_PHONE))
    phone: string;
}
