import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IUserDto } from "../interfaces";
import { sbUser } from "../../../swagger/utils/swagger-request";

export class UpdateUserDto implements Partial<IUserDto> {
    @ApiPropertyOptional({ example: sbUser.firstName })
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ example: sbUser.lastName })
    @IsOptional()
    lastName?: string;
}
