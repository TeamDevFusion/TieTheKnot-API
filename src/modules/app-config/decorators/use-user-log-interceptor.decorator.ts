/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseInterceptors } from "@nestjs/common";
import { ParamType } from "../enums";
import { UserLogInterceptor } from "../interceptors";
import { UserAction } from "../types";

export const UseUserLogInterceptor = (
    action: UserAction,
    paramType?: ParamType,
    field?: string,
    isArray?: boolean,
): ((target: any, key: string, descriptor: PropertyDescriptor) => TypedPropertyDescriptor<any> | void) => {
    return (target: any, key: string, descriptor: PropertyDescriptor): TypedPropertyDescriptor<any> | void => {
        return UseInterceptors(UserLogInterceptor(action, paramType, field, isArray))(target, key, descriptor);
    };
};
