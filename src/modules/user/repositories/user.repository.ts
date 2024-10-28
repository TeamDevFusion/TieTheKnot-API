import { BaseRepository, GetOneOptions, HichchiRepository } from "hichchi-nestjs-crud";
import { UserEntity } from "../entities";
import { FindOneOptions } from "typeorm";

@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    async getOne(getOne: GetOneOptions<UserEntity>): Promise<UserEntity | undefined> {
        return await super.getOne(getOne);
    }

    async get(id: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity | undefined> {
        return await super.get(id, options);
    }
}
