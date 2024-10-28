import "reflect-metadata";
import { faker } from "@faker-js/faker";
import {
    CreateClientDto,
    CreateUserDto,
    CreateVendorDto,
    PlanStatus,
    RegisterClientDto,
    RegisterVendorDto,
} from "../../modules/user";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

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

export const sbClient: CreateClientDto = {
    ...sbUser,
    ...sbRegClient,
};

export const sbRegVendor: RegisterVendorDto = {
    vendorTypeId: faker.string.uuid(),
    companyName: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    phone: faker.phone.number(),
};

export const sbVendor: CreateVendorDto = {
    ...sbUser,
    ...sbRegVendor,
};

export const sbVendorType = {
    name: faker.person.jobType(),
};
