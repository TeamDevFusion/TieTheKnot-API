import { Column, Entity } from "typeorm";
import { Config, EntityName } from "../../../core/enums";
import { IConfig } from "../interfaces";
import { BaseEntityTemplate } from "hichchi-nestjs-crud";

@Entity(EntityName.CONFIG)
export class ConfigEntity extends BaseEntityTemplate implements IConfig {
    @Column({ type: "enum", enum: Config })
    config: Config;

    @Column({ type: "varchar", nullable: true })
    stringValue?: string;

    @Column({ type: "float", nullable: true })
    numberValue?: number;

    @Column({ type: "json", nullable: true })
    jsonValue?: unknown;

    @Column({ type: "boolean", nullable: true })
    booleanValue?: boolean;
}
