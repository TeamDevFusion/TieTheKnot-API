/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export interface SwaggerSchema {
    [key: string]: Omit<SchemaObject, "required"> & { required?: boolean };
}

export interface SwaggerPathOptions {
    tag: string;
    summary: string;
    description?: string;
    requestBody?: {
        required: boolean;
        contentType: "application/json";
        schema?: SchemaObject | ReferenceObject;
        example?: any;
        examples?: any[];
    };
    responses?: {
        [key: number]: {
            contentType: "application/json";
            description?: string;
            schema?: SchemaObject | ReferenceObject;
            example?: any;
        };
    };
}
