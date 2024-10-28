import { IBaseEntity } from "hichchi-nestjs-crud";
import { IUserLog } from "../../app-config";
import { IUser, IVewUserDto } from "./user.interface";

export interface IVendorDto {
    name: string;
}

export interface IVendorType extends IVendorDto, IBaseEntity {
    vendors?: IUser[] | IVewUserDto[];
    logs?: IUserLog[];
}
