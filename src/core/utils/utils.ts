import { IUserLog } from "../../modules/app-config";

export const removeLogs = <T>(entity: T & { logs?: IUserLog[] }): T => {
    const e = { ...entity, logs: undefined };
    delete e.logs;

    return e;
};
