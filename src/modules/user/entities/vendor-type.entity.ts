import { Column, Entity, OneToMany } from "typeorm";
import { EntityName } from "../../../core/enums";
import { BaseEntity } from "../../../core/entities";
import { UserLogEntity } from "../../app-config";
import { IVendorType } from "../interfaces";
import { UserEntity } from "./user.entity";

@Entity(EntityName.VENDOR_TYPE)
export class VendorTypeEntity extends BaseEntity implements IVendorType {
    @Column()
    name: string;

    @OneToMany(() => UserEntity, log => log.vendorType)
    vendors?: UserEntity[];

    @OneToMany(() => UserLogEntity, log => log.user)
    logs?: UserLogEntity[];
}
