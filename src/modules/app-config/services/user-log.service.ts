import { Injectable } from "@nestjs/common";
import { CrudService } from "hichchi-nestjs-crud";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { UserLogRepository } from "../repositories";
import { UserLogEntity } from "../entities";

@Injectable()
export class UserLogService extends CrudService<UserLogEntity> {
    constructor(@InjectRepository(UserLogRepository) protected readonly userLogRepository: UserLogRepository) {
        super(userLogRepository, "userLog");
    }
}
