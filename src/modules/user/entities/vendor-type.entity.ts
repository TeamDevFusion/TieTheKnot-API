import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { EntityName, UNIQUEConstraint } from "../../../core/enums";
import { IVendorTypeEntity } from "../interfaces";
import { UserEntity } from "./user.entity";
import { UserLogEntity } from "../../app-config/entities";
import { BaseEntityTemplate } from "hichchi-nestjs-crud";
import { IUserEntity as IUserEntityImpl } from "hichchi-nestjs-common/interfaces";

@Entity(EntityName.VENDOR_TYPE)
@Unique(UNIQUEConstraint.VENDOR_TYPE_NAME, ["name"])
export class VendorTypeEntity extends BaseEntityTemplate implements IVendorTypeEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    label?: string;

    @Column({ nullable: true })
    icon?: string;

    @Column({ default: true })
    status: boolean;

    @OneToMany(() => UserEntity, log => log.vendorType)
    vendors?: UserEntity[];

    @OneToMany(() => UserLogEntity, log => log.user)
    logs?: UserLogEntity[];

    @ManyToOne(() => UserEntity, { nullable: true })
    createdBy?: IUserEntityImpl;

    @ManyToOne(() => UserEntity, { nullable: true })
    updatedBy?: IUserEntityImpl;

    @ManyToOne(() => UserEntity, { nullable: true })
    deletedBy?: IUserEntityImpl;
}
