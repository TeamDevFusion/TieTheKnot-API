import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { Exclude } from "class-transformer";
import { EntityName, UNIQUEConstraint } from "../../../core/enums";
import { UserStatus } from "../enums";
import { IClient, IPlanner, IUser, IVendor } from "../interfaces";
import { BaseEntity } from "../../../core/entities";
import { UserLogEntity } from "../../app-config";
import { Role } from "../../../core/enums/role.enum";
import { VendorTypeEntity } from "./vendor-type.entity";

@Entity(EntityName.USER)
@Unique(UNIQUEConstraint.USER_EMAIL, ["email"])
@Unique(UNIQUEConstraint.USER_PHONE, ["phone"])
export class UserEntity extends BaseEntity implements IUser {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    fullName: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @Column({ nullable: true })
    phone?: string;

    @Column({ type: "enum", enum: Role, default: Role.USER })
    role: Role;

    @Column({ type: "json", nullable: true })
    client?: IClient;

    @Column({ type: "json", nullable: true })
    vendor?: IVendor;

    @Column({ type: "json", nullable: true })
    planner?: IPlanner;

    @Column({ nullable: true })
    vendorTypeId?: string;

    @ManyToOne(() => VendorTypeEntity, vendorType => vendorType.vendors)
    vendorType?: VendorTypeEntity;

    @OneToMany(() => UserLogEntity, log => log.user)
    logs?: UserLogEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    beforeInsert?(): void {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}
