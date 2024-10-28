import { Config } from "../../../core/enums";
import { IBaseEntity } from "hichchi-nestjs-crud";

export interface IConfig<T = unknown> extends IBaseEntity {
    config: Config;
    stringValue?: string;
    numberValue?: number;
    booleanValue?: boolean;
    jsonValue?: T;
}
