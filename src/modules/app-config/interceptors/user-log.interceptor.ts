/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { UserLogService } from "../services";
import { httpExceptionFilter } from "hichchi-nestjs-common/utils";
import { PaginatedResponse } from "hichchi-nestjs-crud/classes/paginated-response";
import { Request, Response } from "express";
import { IUserLogDto } from "../interfaces";
import { Endpoint, EntityName } from "../../../core/enums";
import { ParamType, RequestMethod } from "../enums";
import { TokenUser } from "../../../core/types/auth.types";
import { EntityMeta } from "../data";
import { LoggerService } from "hichchi-nestjs-common/services";
import configuration from "../../../core/configs/configuration";
import { UserAction } from "../types";

export const UserLogInterceptor = (
    action: UserAction,
    paramType?: ParamType,
    field?: string,
    isArray?: boolean,
): Type => {
    @Injectable()
    class DynamicUserLogInterceptor implements NestInterceptor {
        constructor(private readonly userLogService: UserLogService) {}

        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
            const req = context.switchToHttp().getRequest();

            return next.handle().pipe(
                tap({
                    next: res => this.logInteraction(req, res),
                    error: error => this.logInteraction(req, undefined, error),
                }),
            );
        }

        logInteraction(req: Request, res?: Response, error?: any): void {
            const user: TokenUser = req["user"] as TokenUser;

            const regExp = new RegExp(`http://|https://|/${configuration().app.version}|/`, "g");
            const parts = req.url.split(regExp);
            const endpoint = (req.url.startsWith(`/${configuration().app.version}`) ? parts[2] : parts[3]) as Endpoint;

            const userLog: IUserLogDto = {
                action,
                ip: req.ip,
                url: req.url,
                endpoint,
                method: req.method as RequestMethod,
                snapshot: {
                    body: req.body,
                    params: req.params,
                    query: req.query,
                    user: { id: user.id },
                },
                byId: user.id,
                sessionId: req["user"]?.sessionId,
            };

            if (res) {
                if (res instanceof PaginatedResponse || Array.isArray(res)) {
                    userLog.snapshot.response = [];
                } else {
                    userLog.snapshot.response = res;
                }
            } else if (error) {
                userLog.exception = httpExceptionFilter(error, req).response;
            }

            const dtos: IUserLogDto[] = [];

            if (isArray) {
                const ids = (paramType === ParamType.RESPONSE ? res : req?.[paramType])?.[field];
                if (Array.isArray(ids)) {
                    ids.forEach(id => {
                        dtos.push(this.fillRelationId({ ...userLog }, id));
                    });
                }
            } else {
                dtos.push(this.fillRelationId(userLog));
            }

            this.userLogService.saveMany(dtos).catch(err => LoggerService.log(err));
        }

        fillRelationId(userLog: IUserLogDto, id?: string): IUserLogDto {
            switch (EntityMeta[action.split("_").shift()]) {
                // TODO: ### Add other entities
                case EntityName.USER:
                    userLog.userId = id || userLog.snapshot?.[paramType]?.[field];
                    break;
                case EntityName.VENDOR_TYPE:
                    userLog.vendorTypeId = id || userLog.snapshot?.[paramType]?.[field];
                    break;
            }
            return userLog;
        }
    }

    return DynamicUserLogInterceptor;
};
