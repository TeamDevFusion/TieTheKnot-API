/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { APiParamType } from "../interfaces";
import { faker } from "@faker-js/faker";

export const ApiDocs = (summary: string, example?: any, params?: APiParamType): MethodDecorator => {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        ApiOperation({ summary })(target, key, descriptor);
        ApiOkResponse({ example })(target, key, descriptor);

        Object.entries(params || {}).forEach(([name, param]) => {
            const { type, example } = param;
            ApiParam({
                name,
                type: type === "uuid" ? "string" : type,
                format: type === "uuid" ? "uuid" : undefined,
                required: true,
                example: example ? example : type === "uuid" ? faker.string.uuid() : undefined,
            })(target, key, descriptor);
        });
    };
};
