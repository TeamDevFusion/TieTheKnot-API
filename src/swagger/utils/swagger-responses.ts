// noinspection JSUnusedGlobalSymbols

import { IUser, IVendorType, UserStatus, ViewUserDto, ViewVendorTypeDto } from "../../modules/user";
import { sbClient, sbUser, sbVendor } from "./swagger-request";
import { faker } from "@faker-js/faker";
import { Role } from "../../core/enums/role.enum";

export const srHealthCheck = { schema: { example: { status: "UP" } } };

const viewUserDto = new ViewUserDto();
const viewVendorTypeDto = new ViewVendorTypeDto();

const user: IUser = {
    id: faker.string.uuid(),
    ...sbUser,
    fullName: `${sbUser.firstName} ${sbUser.lastName}`,
    password: "",
    salt: "",
    status: UserStatus.ACTIVE,
    client: sbClient,
    vendor: sbVendor,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const vendorType: IVendorType = {
    id: faker.string.uuid(),
    name: faker.person.jobType(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const srAdmin = viewUserDto.formatDataSet({ ...user, role: Role.ADMIN });

export const srClient = viewUserDto.formatDataSet({ ...user, role: Role.USER });

export const srVendor = viewUserDto.formatDataSet({ ...user, role: Role.VENDOR });

export const srPlanner = viewUserDto.formatDataSet({ ...user, role: Role.PLANNER });

export const paramId = { id: { type: "uuid", example: srAdmin.id } };

export const authResponse = {
    accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOTk1ZmI3YS01YWJlLTRkMzktODYxMi0xMGY5ZjJkMTExYWIiLCJlbWFpbCI6ImF2YXdhcnVuYUBnbWFpbC5jb20iLCJpYXQiOjE3MjczNTQ4OTcsImV4cCI6MTcyNzQ0MTI5N30.XV2UJrOhGwpXbUwLe38f27EpOuo-EZQhU9KJ_EvhMGc",
    refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOTk1ZmI3YS01YWJlLTRkMzktODYxMi0xMGY5ZjJkMTExYWIiLCJlbWFpbCI6ImF2YXdhcnVuYUBnbWFpbC5jb20iLCJpYXQiOjE3MjczNTQ4OTcsImV4cCI6MTcyOTk0Njg5N30.LSVdnHO1m1V4rC2Ez_bGNbfJdRoSZvh89kfcKWr8pgk",
    accessTokenExpiresIn: "86400s",
    refreshTokenExpiresIn: "2592000s",
    user: srClient,
};

export const srVendorType: Partial<IVendorType> = viewVendorTypeDto.formatDataSet(vendorType);

export const srE400 = {
    schema: {
        example: {
            status: 400,
            code: "ENTITY_400_ERROR",
            message: "Bad Request",
        },
    },
};

export const srE401 = {
    schema: {
        example: {
            status: 401,
            code: "ENTITY_401_ERROR",
            message: "Unauthorized",
        },
    },
};

export const srE404 = {
    schema: {
        example: {
            status: 401,
            code: "ENTITY_401_ERROR",
            message: "Not found",
        },
    },
};
