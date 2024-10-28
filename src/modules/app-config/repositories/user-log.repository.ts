import { BaseRepository, HichchiRepository } from "hichchi-nestjs-crud";
import { UserLogEntity } from "../entities";

@HichchiRepository(UserLogEntity)
export class UserLogRepository extends BaseRepository<UserLogEntity> {}
