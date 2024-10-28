import { ConfigEntity } from "../entities";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { Config } from "../../../core/enums";

@Injectable()
export class ConfigRepository {
    constructor(
        @InjectRepository(ConfigEntity)
        private repository: Repository<ConfigEntity>,
    ) {}

    async get<T>(config: Config): Promise<T | null> {
        const configEntity = await this.repository.findOneBy({ config });
        const { stringValue, numberValue, booleanValue, jsonValue } = configEntity ?? {};
        return (stringValue ?? numberValue ?? booleanValue ?? jsonValue ?? null) as T | null;
    }

    async set<T>(config: Config, value: T): Promise<void> {
        const jsonValue = typeof value === "object" ? value : undefined;
        const stringValue = typeof value === "string" ? value : undefined;
        const booleanValue = typeof value === "boolean" ? value : undefined;
        const numberValue = typeof value === "number" ? value : undefined;
        await this.repository.upsert({ config, stringValue, numberValue, booleanValue, jsonValue }, ["config"]);
    }
}
