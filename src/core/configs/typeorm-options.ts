import configuration from "./configuration";
import { FKConstraint, UNIQUEConstraint } from "../enums";

export const typeOrmOptions = {
    type: configuration().database.type,
    host: configuration().database.host,
    port: configuration().database.port,
    username: configuration().database.user,
    password: configuration().database.password,
    database: configuration().database.schema,
    charset: configuration().database.charset,
    synchronize: configuration().database.synchronize,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    ssl: configuration().database.ssl,
    migrationsRun: false,
    legacySpatialSupport: false,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    constraints: { ...FKConstraint, ...UNIQUEConstraint },
};
