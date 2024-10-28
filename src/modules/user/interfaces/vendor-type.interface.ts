import { IBaseEntity } from "hichchi-nestjs-crud";
import { IUser, IVewUserDto } from "./user.interface";
import { IUserLog } from "../../app-config/interfaces";

export interface IVendorDto {
    name: string;
}

export interface IVendorType extends IVendorDto, IBaseEntity {
    vendors?: IUser[] | IVewUserDto[];
    logs?: IUserLog[];
}
