import { Injectable, NotFoundException } from "@nestjs/common";
import { CrudService } from "hichchi-nestjs-crud";
import { AuthService, IUserService } from "hichchi-nestjs-auth";
import { UserEntity } from "../entities";
import {
    CreateClientDto,
    CreateUserDto,
    CreateVendorDto,
    RegisterUserDto,
    UpdateClientDto,
    UpdateUserDto,
    UpdateVendorDto,
} from "../dtos";
import { EmailService } from "../../email";
import { UserStatus } from "../enums";
import { UserRepository } from "../repositories";
import { IClient, IUser, IVendor } from "../interfaces";
import { Role } from "../../../core/enums/role.enum";
import { TokenUser } from "../../../core/types/auth.types";
import { UserErrors } from "../responses";
import { IStatusResponse } from "hichchi-nestjs-common/interfaces";
import configuration from "../../../core/configs/configuration";

@Injectable()
export class UserService extends CrudService<UserEntity> implements IUserService {
    constructor(
        readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
    ) {
        super(userRepository, "user", "email");
    }

    registerUser(registerUserDto: RegisterUserDto): Promise<IUser> {
        return this.transaction(async (): Promise<UserEntity> => {
            const user = await super.save({ ...registerUserDto, role: Role.USER, username: registerUserDto.email });
            await this.emailService.sendWelcomeMail({ email: registerUserDto.email });
            return user;
        });
    }

    async getUserById(id: string): Promise<IUser | undefined> {
        try {
            return await super.get(id);
        } catch (e) {
            return undefined;
        }
    }

    async getUserByEmail(email: string): Promise<IUser | undefined> {
        try {
            return await super.getOne({ where: { email } });
        } catch (e) {
            return undefined;
        }
    }

    async updateUserById(id: string, userDto: IUser, updatedBy: IUser): Promise<IUser> {
        const { role, ...dto } = userDto;
        return await super.update(id, dto, undefined, updatedBy);
    }

    getUser(id: string, role: Role): Promise<IUser> {
        return this.getOne({ where: { id, role }, relations: ["vendorType"] });
    }

    createUser(dto: CreateUserDto | CreateClientDto | CreateVendorDto, role: Role, createdBy: IUser): Promise<IUser> {
        const rawPassword = configuration().app.defaultPassword;
        const { password, salt } = AuthService.generatePassword(rawPassword);

        const client: IClient = {
            planStatus: (dto as CreateClientDto).planStatus,
            partnerFirstName: (dto as CreateClientDto).partnerFirstName,
            partnerLastName: (dto as CreateClientDto).partnerLastName,
        };

        const vendor: IVendor = {
            vendorTypeId: (dto as CreateVendorDto).vendorTypeId,
            companyName: (dto as CreateVendorDto).companyName,
            address: (dto as CreateVendorDto).address,
            city: (dto as CreateVendorDto).city,
            phone: (dto as CreateVendorDto).phone,
        };

        return this.transaction(async (): Promise<UserEntity> => {
            const user = await this.save(
                {
                    ...dto,
                    password,
                    salt,
                    role,
                    vendorTypeId: (dto as CreateVendorDto).vendorTypeId,
                    status: UserStatus.ACTIVE,
                    client: role === Role.USER ? client : undefined,
                    vendor: role === Role.VENDOR ? vendor : undefined,
                },
                undefined,
                createdBy,
            );
            await this.emailService.sendWelcomeMail({ email: dto.email, name: user.firstName, password: rawPassword });
            return user;
        });
    }

    async updateUser(
        id: string,
        dto: UpdateUserDto | UpdateClientDto | UpdateVendorDto,
        role: Role,
        updatedBy: TokenUser,
    ): Promise<IUser> {
        const user = await this.get(id);

        if (user.role !== role) {
            throw new NotFoundException(UserErrors.USER_404_USER_NOT_FOUND(role));
        }

        const client: IClient = {
            planStatus: (dto as UpdateClientDto).planStatus || user.client?.planStatus,
            partnerFirstName: (dto as UpdateClientDto).partnerFirstName || user.client?.partnerFirstName,
            partnerLastName: (dto as UpdateClientDto).partnerLastName || user.client?.partnerLastName,
        };

        const vendor: IVendor = {
            vendorTypeId: (dto as UpdateVendorDto).vendorTypeId || user.vendor?.vendorTypeId,
            companyName: (dto as UpdateVendorDto).companyName || user.vendor?.companyName,
            address: (dto as UpdateVendorDto).address || user.vendor?.address,
            city: (dto as UpdateVendorDto).city || user.vendor?.city,
            phone: (dto as UpdateVendorDto).phone || user.vendor?.phone,
        };

        return this.update(
            id,
            {
                ...dto,
                vendorTypeId: (dto as UpdateVendorDto).vendorTypeId || user.vendor?.vendorTypeId,
                client: role === Role.USER ? client : undefined,
                vendor: role === Role.VENDOR ? vendor : undefined,
            },
            undefined,
            updatedBy,
        );
    }

    async deleteUser(id: string, role: Role, deletedBy: TokenUser): Promise<IUser> {
        const user = await this.get(id);

        if (user.role !== role) {
            throw new NotFoundException(UserErrors.USER_404_USER_NOT_FOUND(role));
        }

        return this.delete(id, deletedBy);
    }

    async deleteUserByIds(ids: string[], role: Role, deletedBy: TokenUser): Promise<IStatusResponse> {
        const users = await this.getByIds({ ids });

        if (users.some(user => user.role !== role)) {
            throw new NotFoundException(UserErrors.USER_404_USER_NOT_FOUND(role));
        }

        return this.transaction((): Promise<IStatusResponse> => {
            return this.deleteByIds(ids, deletedBy);
        });
    }
}
