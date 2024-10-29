import "reflect-metadata";
import { faker } from "@faker-js/faker";
import {
    CreateClientDto,
    CreateUserDto,
    CreateVendorDto,
    RegisterClientDto,
    RegisterUserDto,
    RegisterVendorDto,
} from "../../modules/user/dtos";
import { PlanStatus } from "../../modules/user/enums";
import { Role } from "../../core/enums/role.enum";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const password = faker.internet.password();

export const sbUser: CreateUserDto = {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
};

export const sbRegClient: RegisterClientDto = {
    planStatus: "planning" as PlanStatus,
    partnerFirstName: faker.person.firstName(),
    partnerLastName: faker.person.lastName(),
};

export const sbRegVendor: RegisterVendorDto = {
    vendorTypeId: faker.string.uuid(),
    companyName: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    phone: faker.phone.number(),
};

export const sbClient: CreateClientDto = {
    ...sbUser,
    ...sbRegClient,
};

export const sbVendor: CreateVendorDto = {
    ...sbUser,
    ...sbRegVendor,
};

export const sbRegUser: RegisterUserDto = {
    role: Role.USER,
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password,
    client: sbRegClient,
    vendor: sbRegVendor,
    planner: {},
};

export const sbVendorType = {
    name: faker.person.jobType(),
    icon: faker.internet.url(),
};
