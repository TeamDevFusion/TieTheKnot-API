/* eslint-disable @typescript-eslint/no-explicit-any */
import { Endpoint } from "../../../core/enums";
import { RequestMethod } from "../enums";
import { LogSnapshot, UserAction } from "../types";
import { IUserEntity, IVendorTypeEntity } from "../../user/interfaces";

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
    // TODO: ### Add id field for each entity which needs to be logged (ex: userId)
    userId?: string;
    vendorTypeId?: string;
}

export interface IUserLog extends IUserLogDto {
    by?: IUserEntity;
    createdAt: Date;
    // TODO: ### Add relation field for each entity which needs to be logged (ex: user)
    user?: IUserEntity;
    vendorType?: IVendorTypeEntity;
}
