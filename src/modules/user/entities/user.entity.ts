import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { Exclude } from "class-transformer";
import { EntityName, FKConstraint, UNIQUEConstraint } from "../../../core/enums";
import { UserStatus } from "../enums";
import { ICreateClientDto, ICreatePlannerDto, IUserEntity, ICreateVendorDto } from "../interfaces";
import { Role } from "../../../core/enums/role.enum";
import { VendorTypeEntity } from "./vendor-type.entity";
import { UserLogEntity } from "../../app-config/entities";
import { BaseEntityTemplate } from "hichchi-nestjs-crud";
import { IUserEntity as IUserEntityImpl } from "hichchi-nestjs-common/interfaces";

@Entity(EntityName.USER)
@Unique(UNIQUEConstraint.USER_EMAIL, ["email"])
@Unique(UNIQUEConstraint.USER_PHONE, ["phone"])
export class UserEntity extends BaseEntityTemplate implements IUserEntity {
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
    client?: ICreateClientDto;

    @Column({ type: "json", nullable: true })
    vendor?: ICreateVendorDto;

    @Column({ type: "json", nullable: true })
    planner?: ICreatePlannerDto;

    @Column({ nullable: true })
    vendorTypeId?: string;

    @ManyToOne(() => VendorTypeEntity, vendorType => vendorType.vendors)
    @JoinColumn({ foreignKeyConstraintName: FKConstraint.USER_VENDOR_TYPE })
    vendorType?: VendorTypeEntity;

    @OneToMany(() => UserLogEntity, log => log.user)
    logs?: UserLogEntity[];

    @ManyToOne(() => UserEntity, { nullable: true })
    createdBy?: IUserEntityImpl;

    @ManyToOne(() => UserEntity, { nullable: true })
    updatedBy?: IUserEntityImpl;

    @ManyToOne(() => UserEntity, { nullable: true })
    deletedBy?: IUserEntityImpl;

    @BeforeInsert()
    @BeforeUpdate()
    beforeInsert?(): void {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}
