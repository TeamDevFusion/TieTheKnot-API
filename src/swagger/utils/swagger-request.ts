import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { PlanStatus } from "../../modules/user/enums";
import { Role } from "../../core/enums";
import {
    ICreateClientDto,
    ICreateUserDto,
    ICreateVendorDto,
    ICreateVendorTypeDto,
    IRegisterUserDto,
} from "../../modules/user/interfaces";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const password = faker.internet.password();

export const sbUser: ICreateUserDto = {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
};

export const sbRegClient: ICreateClientDto = {
    planStatus: "planning" as PlanStatus,
    partnerFirstName: faker.person.firstName(),
    partnerLastName: faker.person.lastName(),
};

export const sbRegVendor: ICreateVendorDto = {
    vendorTypeId: faker.string.uuid(),
    companyName: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    phone: faker.phone.number(),
};

export const sbClient: ICreateClientDto = {
    ...sbUser,
    ...sbRegClient,
};

export const sbVendor: ICreateVendorDto = {
    ...sbUser,
    ...sbRegVendor,
};

export const sbRegUser: IRegisterUserDto = {
    role: Role.USER,
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password,
    client: sbRegClient,
    vendor: sbRegVendor,
    planner: {},
};

const vendorName = faker.person.jobType();
export const sbVendorType: ICreateVendorTypeDto = {
    name: vendorName,
    label: vendorName,
    icon: faker.internet.url(),
};
