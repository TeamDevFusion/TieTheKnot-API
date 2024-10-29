import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthErrors } from "hichchi-nestjs-auth";
import { toErrString } from "hichchi-nestjs-common/converters";
import { ApiProperty } from "@nestjs/swagger";
import { ICreateUserDto } from "../interfaces";
import { sbUser } from "../../../swagger/utils/swagger-request";

export class CreateUserDto implements ICreateUserDto {
    @ApiProperty({ example: sbUser.firstName })
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_FNAME))
    firstName: string;

    @ApiProperty({ example: sbUser.lastName })
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_LNAME))
    lastName: string;

    @ApiProperty({ example: sbUser.email })
    @IsEmail(undefined, toErrString(AuthErrors.USER_400_INVALID_EMAIL))
    @IsNotEmpty(toErrString(AuthErrors.USER_400_EMPTY_EMAIL))
    email: string;
}
