import { IsEnum, IsNotEmpty, IsNotEmptyObject, ValidateIf, ValidateNested } from "class-validator";
import { AuthErrors, RegisterDto } from "hichchi-nestjs-auth";
import { toErrString } from "hichchi-nestjs-common/converters";
import { Role } from "../../../core/enums";
import { UserErrors } from "../responses";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RegisterClientDto } from "./register-client.dto";
import { RegisterVendorDto } from "./register-vendor.dto";
import { PlannerRegisterDto } from "./planner-register.dto";
import { Type } from "class-transformer";
import { IRegisterUserDto } from "../interfaces";
import { sbRegUser } from "../../../swagger/utils/swagger-request";

export class RegisterUserDto extends RegisterDto implements IRegisterUserDto {
    @ApiPropertyOptional({ enum: Object.values(Role).slice(1, 3), example: sbRegUser.role })
    @IsEnum(Object.values(Role).slice(1, 3), toErrString(UserErrors.USER_400_INVALID_ROLE))
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_ROLE))
    role: Role;

    @ApiProperty({ example: sbRegUser.firstName })
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_FNAME))
    firstName: string;

    @ApiProperty({ example: sbRegUser.lastName })
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_LNAME))
    lastName: string;

    @ApiProperty({ example: sbRegUser.email })
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_EMAIL))
    email: string;

    @ApiProperty({ example: sbRegUser.password })
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    password: string;

    @ValidateNested()
    @Type(() => RegisterClientDto)
    @IsNotEmptyObject(undefined, toErrString(UserErrors.USER_400_EMPTY_CLIENT))
    @ValidateIf(o => !o.role || o.role === Role.USER)
    client: RegisterClientDto;

    @ValidateNested()
    @Type(() => RegisterVendorDto)
    @IsNotEmptyObject(undefined, toErrString(UserErrors.USER_400_EMPTY_VENDOR))
    @ValidateIf(o => o.role === Role.VENDOR)
    vendor: RegisterVendorDto;

    @ValidateNested()
    @Type(() => PlannerRegisterDto)
    @IsNotEmptyObject(undefined, toErrString(UserErrors.USER_400_EMPTY_PLANNER))
    @ValidateIf(o => o.role === Role.PLANNER)
    planner: PlannerRegisterDto;
}
