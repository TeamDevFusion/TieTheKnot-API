// noinspection JSUnusedGlobalSymbols

export type MulterFiles<T extends string> = {
    [K in T]?: Express.Multer.File[];
};
