import { PaginatedResponse } from "hichchi-nestjs-crud/classes/paginated-response";
import { EntityName } from "../../core/enums";
import { IStatusResponse } from "hichchi-nestjs-common/interfaces";
import { EntityUtils } from "hichchi-nestjs-crud/utils";
import { Operation } from "hichchi-nestjs-crud";

export const srPaginated = <T>(sr: T[]): PaginatedResponse<T> => {
    return {
        page: 1,
        limit: 10,
        data: sr.slice(0, 10),
        rowCount: sr.length,
    };
};

export const srDeleted = (entityName: EntityName): IStatusResponse =>
    EntityUtils.handleSuccess(Operation.DELETE, entityName);
