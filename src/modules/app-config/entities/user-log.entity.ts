/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Endpoint, EntityName } from "../../../core/enums";
import { IUserLog } from "../interfaces";
import { LogSnapshot, UserAction } from "../types";
import { RequestMethod } from "../enums";
import { IUserEntity } from "hichchi-nestjs-common/interfaces";
import { UserEntity, VendorTypeEntity } from "../../user/entities";

// TODO: ### Add other entities
@Entity(EntityName.USER_LOG)
export class UserLogEntity implements IUserLog {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    ip?: string;

    @Column({ nullable: true })
    url: string;

    @Column()
    action: UserAction;

    @Column({ type: "json", nullable: true })
    snapshot?: LogSnapshot;

    @Column()
    endpoint?: Endpoint;

    @Column({ type: "enum", enum: RequestMethod, nullable: true })
    method?: RequestMethod;

    @Column({ type: "json", nullable: true })
    exception?: any;

    @Column({ nullable: true })
    sessionId?: string;

    @Column({ nullable: true })
    byId?: string;

    @ManyToOne(() => UserEntity)
    by?: UserEntity;

    @Column({ nullable: true })
    userId?: string;

    @ManyToOne(() => UserEntity, user => user.logs)
    user?: UserEntity;

    @Column({ nullable: true })
    vendorTypeId?: string;

    @ManyToOne(() => VendorTypeEntity, vendorType => vendorType.logs)
    vendorType?: VendorTypeEntity;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    // noinspection JSUnusedGlobalSymbols
    createdBy: IUserEntity;

    // noinspection JSUnusedGlobalSymbols
    updatedAt: Date;

    // noinspection JSUnusedGlobalSymbols
    updatedBy: IUserEntity;

    // noinspection JSUnusedGlobalSymbols
    deletedAt: Date;

    // noinspection JSUnusedGlobalSymbols
    deletedBy: IUserEntity;
}
