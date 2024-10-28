import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthErrors } from "hichchi-nestjs-auth";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiProperty } from "@nestjs/swagger";
import { IUserDto } from "../interfaces";
import { sbUser } from "../../../swagger/utils/swagger-request";

export class CreateUserDto implements IUserDto {
    @ApiProperty({ example: sbUser.firstName })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: sbUser.lastName })
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_LNAME))
    lastName: string;

    @ApiProperty({ example: sbUser.email })
    @IsEmail(undefined, toErrString(AuthErrors.USER_400_INVALID_EMAIL))
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_EMAIL))
    email: string;
}