/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamType } from "../enums";

export type LogSnapshot = {
    [p in ParamType]?: any;
};
