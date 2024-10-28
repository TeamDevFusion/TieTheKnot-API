import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { EntityName } from "../../../core/enums";
import { IVendorType } from "../interfaces";
import { UserEntity } from "./user.entity";
import { UserLogEntity } from "../../app-config/entities";
import { BaseEntityTemplate } from "hichchi-nestjs-crud";
import { IUserEntity } from "hichchi-nestjs-common/interfaces";

@Entity(EntityName.VENDOR_TYPE)
export class VendorTypeEntity extends BaseEntityTemplate implements IVendorType {
    @Column()
    name: string;

    @OneToMany(() => UserEntity, log => log.vendorType)
    vendors?: UserEntity[];

    @OneToMany(() => UserLogEntity, log => log.user)
    logs?: UserLogEntity[];

    @ManyToOne(() => UserEntity, { nullable: true })
    createdBy?: IUserEntity;

    @ManyToOne(() => UserEntity, { nullable: true })
    updatedBy?: IUserEntity;

    @ManyToOne(() => UserEntity, { nullable: true })
    deletedBy?: IUserEntity;
}
