/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiGetAllDocsOptions {
    summary: string;
    example: any;
    pagination?: boolean;
    sort?: boolean;
    search?: boolean;
}

export interface APiParamType {
    [key: string]: { type: string; example?: any };
}
