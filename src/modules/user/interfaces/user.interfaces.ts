import { UserStatus } from "../enums";
import { IUserEntity as IUserEntityImpl } from "hichchi-nestjs-common/interfaces";
import { IBaseEntity } from "hichchi-nestjs-crud";
import { Role } from "../../../core/enums";
import { IUserLog } from "../../app-config/interfaces";
import { IVendorTypeEntity, IViewVendorTypeDto } from "./vendor-type.interfaces";

export interface ICreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
}

export interface IUpdateUserDto {
    firstName?: string;
    lastName?: string;
}

export interface ICreateClientDto {
    planStatus: string;
    partnerFirstName: string;
    partnerLastName: string;
}

export interface IUpdateClientDto {
    planStatus?: string;
    partnerFirstName?: string;
    partnerLastName?: string;
}

export interface ICreateVendorDto {
    vendorTypeId: string;
    companyName: string;
    address: string;
    city: string;
    phone: string;
}

export interface IUpdateVendorDto {
    vendorTypeId?: string;
    companyName?: string;
    address?: string;
    city?: string;
    phone?: string;
}

// This interface is reserved for future use
export interface ICreatePlannerDto {}

// This interface is reserved for future use
export interface IUpdatePlannerDto {}

export interface IRegisterUserDto extends ICreateUserDto {
    role: Role;
    password: string;
    client?: ICreateClientDto;
    vendor?: ICreateVendorDto;
    planner?: ICreatePlannerDto;
}
type WithUserEntityImpl = IRegisterUserDto & IUserEntityImpl;

export interface IUser extends WithUserEntityImpl {
    fullName: string;
    email: string;
    salt: string;
    status: UserStatus;
}

type UserEntityWithBaseEntity = IUser & IBaseEntity;

export interface IUserEntity extends UserEntityWithBaseEntity {
    vendorTypeId?: string;
    vendorType?: IVendorTypeEntity;
    logs?: IUserLog[];
}

export type IViewUserDto = Omit<IUserEntity, "password" | "salt" | "vendorType" | "logs"> &
    IUpdateClientDto &
    IUpdateVendorDto &
    IUpdatePlannerDto & { vendorType?: IViewVendorTypeDto };
