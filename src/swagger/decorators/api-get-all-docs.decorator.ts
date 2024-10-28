/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiQuery } from "@nestjs/swagger";

import { ApiDocs } from "./api-docs.decorator";
import { ApiGetAllDocsOptions } from "../interfaces";

export function ApiGetAllDocs(summary: string, example: any): MethodDecorator;
export function ApiGetAllDocs(options: ApiGetAllDocsOptions): MethodDecorator;
// eslint-disable-next-line func-style
export function ApiGetAllDocs(summaryOrOptions: string | ApiGetAllDocsOptions, responseExample?: any): MethodDecorator {
    const {
        summary,
        example,
        pagination = true,
        sort = true,
        search = true,
    } = typeof summaryOrOptions === "string"
        ? { summary: summaryOrOptions, example: responseExample }
        : summaryOrOptions;

    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        ApiDocs(summary, example)(target, key, descriptor);

        if (pagination) {
            ApiQuery({
                name: "page",
                required: false,
                schema: { type: "string", example: "1" },
                description: "Page number",
            })(target, key, descriptor);
            ApiQuery({
                name: "limit",
                required: false,
                schema: { type: "string", example: "10" },
                description: "Number of items per page",
            })(target, key, descriptor);
        }

        if (sort) {
            ApiQuery({
                name: "sort",
                required: false,
                schema: { type: "string", example: "email.asc,status.desc" },
                description: "Sort by column name and order (column.asc,column.desc)",
            })(target, key, descriptor);
        }
        if (search) {
            ApiQuery({
                name: "search",
                required: false,
                schema: { type: "string", example: "keyword" },
                description: "Search keyword",
            })(target, key, descriptor);
        }
    };
}
