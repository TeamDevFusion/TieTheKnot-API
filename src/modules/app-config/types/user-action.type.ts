import { EntityMeta } from "../data";
import { Action } from "../enums";

export type UserAction = `${keyof typeof EntityMeta}_${Action}`;

// export type UserActions = { [key: string]: UserAction };
