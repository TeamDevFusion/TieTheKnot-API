import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { SwaggerPathOptions, SwaggerSchema } from "../../core/interfaces/swagger.interfaces";
import {
    ReferenceObject,
    ResponsesObject,
    SchemaObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { Role } from "../../core/enums/role.enum";
import configuration from "../../core/configs/configuration";
import { INestApplication } from "@nestjs/common";
import { authResponse, srClient, srE400, srE401 } from "./swagger-responses";
import { faker } from "@faker-js/faker";
import { sbClient, sbRegClient, sbRegVendor, sbUser, sbVendor } from "./swagger-request";
import { PlanStatus } from "../../modules/user/enums";

export const addSwaggerSchema = (doc: OpenAPIObject, name: string, schema: SwaggerSchema): ReferenceObject => {
    const properties: Record<string, SchemaObject | ReferenceObject> = {};
    const requiredProperties: string[] = [];

    Object.entries(schema).forEach(([key, options]) => {
        const { required, ...opt } = options;
        properties[key] = opt;
        if (required) {
            requiredProperties.push(key);
        }
    });

    doc.components.schemas[name] = {
        type: "object",
        properties,
        required: requiredProperties, // Specify required fields
    };

    return { $ref: `#/components/schemas/${name}` };
};

export const addSwaggerPath = (doc: OpenAPIObject, path: string, options: SwaggerPathOptions): void => {
    const responses: ResponsesObject = {};

    Object.entries(options.responses || {}).forEach(([key, option]) => {
        responses[key] = {
            description: option.description,
            content: {
                [option.contentType]: {
                    schema: option.schema,
                    example: option.example,
                },
            },
        };
    });

    doc.paths[path] = {
        post: {
            tags: [options.tag],
            summary: options.description,
            requestBody: options.requestBody
                ? {
                      required: options.requestBody.required,
                      content: {
                          [options.requestBody.contentType]: {
                              schema: options.requestBody.schema,
                              example: options.requestBody.example,
                          },
                      },
                  }
                : undefined,
            responses,
        },
    };
};

export const setupSwagger = (app: INestApplication): OpenAPIObject => {
    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle(configuration().app.title)
        .setDescription(configuration().swagger.description)
        .setVersion(configuration().app.version)
        .build();

    const doc = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(`${configuration().app.version}/docs`, app, doc, {
        explorer: true,
        swaggerOptions: {
            docExpansion: "none",
            filter: true,
            showRequestDuration: true,
        },
    });

    addSwaggerSchema(doc, "BulkDeleteDto", {
        ids: { type: "string[]", required: true, example: [faker.string.uuid(), faker.string.uuid()] },
    });

    const LoginDto = addSwaggerSchema(doc, "LoginDto", {
        email: { type: "string", required: true, example: sbUser.email },
        password: { type: "string", required: true, example: faker.string.alphanumeric(8) },
    });

    const UpdatePasswordDto = addSwaggerSchema(doc, "UpdatePasswordDto", {
        oldPassword: { type: "string", required: true, example: faker.string.alphanumeric(8) },
        newPassword: { type: "string", required: true, example: faker.string.alphanumeric(8) },
    });

    addSwaggerSchema(doc, "RegisterClientDto", {
        status: { type: "enum", required: true, enum: Object.values(PlanStatus), example: PlanStatus.Planning },
        partnerFirstName: { type: "string", required: true, example: sbClient.partnerFirstName },
        partnerLastName: { type: "string", required: true, example: sbClient.partnerLastName },
    });

    addSwaggerSchema(doc, "RegisterVendorDto", {
        type: { type: "string", required: true, example: "" },
        companyName: { type: "string", required: true, example: sbVendor.companyName },
        address: { type: "string", required: true, example: sbVendor.address },
        city: { type: "string", required: true, example: sbVendor.city },
        phone: { type: "string", required: true, example: sbVendor.phone },
    });

    const RegisterDto = addSwaggerSchema(doc, "RegisterDto", {
        role: { type: "enum", enum: Object.values(Role).slice(1), default: Role.USER },
        email: { type: "string", required: true, example: sbUser.email },
        password: { type: "string", required: true, example: faker.string.alphanumeric(8) },
        firstName: { type: "string", required: true, example: sbUser.firstName },
        lastName: { type: "string", required: true, example: sbUser.lastName },
        client: { type: "RegisterClientDto" },
        vendor: { type: "RegisterVendorDto" },
    });

    addSwaggerPath(doc, `/${configuration().app.version}/auth/login`, {
        tag: "Auth",
        description: "Login to the system",
        requestBody: {
            required: true,
            contentType: "application/json",
            schema: LoginDto,
        },
        responses: {
            200: {
                contentType: "application/json",
                description: "User logged in successfully",
                example: authResponse,
            },
            400: {
                contentType: "application/json",
                example: srE400.schema.example,
            },
            401: {
                contentType: "application/json",
                example: {
                    status: 401,
                    code: "AUTH_401_INVALID_UNAME_PASSWORD",
                    message: "Invalid username or password!",
                },
            },
        },
    });

    addSwaggerPath(doc, `/${configuration().app.version}/auth/register`, {
        tag: "Auth",
        description: "Register a new user",
        requestBody: {
            required: true,
            contentType: "application/json",
            schema: RegisterDto,
            example: { ...sbUser, client: sbRegClient, vendor: sbRegVendor },
        },
        responses: {
            201: {
                description: "User registered successfully",
                contentType: "application/json",
                example: srClient,
            },
            400: {
                contentType: "application/json",
                example: srE400.schema.example,
            },
        },
    });

    addSwaggerPath(doc, `/${configuration().app.version}/auth/me`, {
        tag: "Auth",
        description: "Get current user",
        responses: {
            200: {
                description: "User retrieved successfully",
                contentType: "application/json",
                example: srClient,
            },
            400: {
                contentType: "application/json",
                example: srE400.schema.example,
            },
            401: {
                contentType: "application/json",
                example: srE401.schema.example,
            },
        },
    });

    addSwaggerPath(doc, `/${configuration().app.version}/auth/change-password`, {
        tag: "Auth",
        description: "Change user password",
        requestBody: {
            required: true,
            contentType: "application/json",
            schema: UpdatePasswordDto,
        },
        responses: {
            200: {
                description: "Password changed successfully",
                contentType: "application/json",
                example: srClient,
            },
            400: {
                contentType: "application/json",
                example: srE400.schema.example,
            },
            401: {
                contentType: "application/json",
                example: srE401.schema.example,
            },
        },
    });

    addSwaggerPath(doc, `/${configuration().app.version}/auth/logout`, {
        tag: "Auth",
        description: "Logout user",
        requestBody: {
            required: true,
            contentType: "application/json",
            example: {},
        },
        responses: {
            200: {
                description: "User logged out successfully",
                contentType: "application/json",
                example: {
                    code: "SUCCESS",
                    message: "Successfully logged out",
                    status: 200,
                },
            },
            400: {
                contentType: "application/json",
                example: srE400.schema.example,
            },
            401: {
                contentType: "application/json",
                example: srE401.schema.example,
            },
        },
    });

    return doc;
};
