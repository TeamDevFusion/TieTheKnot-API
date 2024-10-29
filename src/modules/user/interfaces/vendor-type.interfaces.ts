import { IBaseEntity } from "hichchi-nestjs-crud";
import { IUserEntity, IViewUserDto } from "./user.interfaces";
import { IUserLog } from "../../app-config/interfaces";

export interface ICreateVendorTypeDto {
    name: string;
    label?: string;
    icon?: string;
}

export interface IUpdateVendorTypeDto {
    name?: string;
    label?: string;
    icon?: string;
}

export interface IVendorType extends ICreateVendorTypeDto {
    status: boolean;
}

export interface IVendorTypeEntity extends IVendorType, IBaseEntity {
    vendors?: IUserEntity[];
    logs?: IUserLog[];
}

export interface IViewVendorTypeDto extends Omit<IVendorTypeEntity, "logs" | "vendors"> {
    vendors?: IViewUserDto[];
}
