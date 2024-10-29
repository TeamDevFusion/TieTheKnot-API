import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IUpdateUserDto } from "../interfaces";
import { sbUser } from "../../../swagger/utils/swagger-request";

export class UpdateUserDto implements IUpdateUserDto {
    @ApiPropertyOptional({ example: sbUser.firstName })
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ example: sbUser.lastName })
    @IsOptional()
    lastName?: string;
}
