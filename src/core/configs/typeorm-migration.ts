// noinspection JSUnusedGlobalSymbols

import { DataSource } from "typeorm";
import { typeOrmOptions } from "./typeorm-options";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

export default new DataSource({ ...typeOrmOptions, synchronize: false } as DataSourceOptions);
