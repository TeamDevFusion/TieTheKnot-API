import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { toErrString } from "hichchi-nestjs-common/converters";
import { UserErrors } from "../responses";
import { ICreateVendorDto } from "../interfaces";
import { sbRegVendor } from "../../../swagger/utils/swagger-request";

export class RegisterVendorDto implements ICreateVendorDto {
    @ApiProperty({ example: sbRegVendor.vendorTypeId })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_TYPE))
    vendorTypeId: string;

    @ApiProperty({ example: sbRegVendor.companyName })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_COMPANY_NAME))
    companyName: string;

    @ApiProperty({ example: sbRegVendor.address })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_ADDRESS))
    address: string;

    @ApiProperty({ example: sbRegVendor.city })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_CITY))
    city: string;

    @ApiProperty({ example: sbRegVendor.phone })
    @IsNotEmpty(toErrString(UserErrors.VENDOR_400_EMPTY_PHONE))
    phone: string;
}
