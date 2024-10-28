import { UserStatus } from "../enums";
import { IUserEntity } from "hichchi-nestjs-common/interfaces";
import { IBaseEntity } from "hichchi-nestjs-crud";
import { IUserLog } from "../../app-config";
import { Role } from "../../../core/enums/role.enum";
import { IClient } from "./client.interface";
import { IVendor } from "./vendor.interface";
import { IPlanner } from "./planner.interface";

export interface IUserDto {
    firstName: string;
    lastName: string;
    email: string;
}

type UserEntityWithBaseEntity = IUserDto & IUserEntity & IBaseEntity;

export interface IUser extends UserEntityWithBaseEntity {
    fullName: string;
    password: string;
    salt: string;
    status: UserStatus;
    role?: Role;
    client?: IClient;
    vendor?: IVendor;
    planner?: IPlanner;
    logs?: IUserLog[];
}

export type IVewUserDto = Partial<IUser & IClient & IVendor & IPlanner> & IBaseEntity;
