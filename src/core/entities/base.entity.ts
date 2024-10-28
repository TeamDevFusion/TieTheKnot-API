import { BaseEntityTemplate, IBaseEntity } from "hichchi-nestjs-crud";
import { UserEntity } from "../../modules/user";
import { ManyToOne } from "typeorm";
import { IUserEntity } from "hichchi-nestjs-common/interfaces";

export class BaseEntity extends BaseEntityTemplate implements IBaseEntity {
    @ManyToOne(() => UserEntity, { nullable: true })
    createdBy?: IUserEntity;

    @ManyToOne(() => UserEntity, { nullable: true })
    updatedBy?: IUserEntity;

    @ManyToOne(() => UserEntity, { nullable: true })
    deletedBy?: IUserEntity;
}
