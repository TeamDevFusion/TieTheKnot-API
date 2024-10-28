/* eslint-disable @typescript-eslint/no-explicit-any */
import { Endpoint } from "../../../core/enums";
import { RequestMethod } from "../enums";
import { LogSnapshot, UserAction } from "../types";
import { IUser, IVendorType } from "../../user/interfaces";

// TODO: ### Add other entities
export interface IUserLogDto {
    ip?: string;
    url: string;
    action: UserAction;
    snapshot?: LogSnapshot;
    endpoint?: Endpoint;
    method?: RequestMethod;
    exception?: any;
    sessionId?: string;
    byId?: string;
    userId?: string;
    vendorTypeId?: string;
}

// TODO: ### Add other entities
export interface IUserLog extends IUserLogDto {
    by?: IUser;
    user?: IUser;
    vendorType?: IVendorType;
    createdAt: Date;
}
