import { EntityName } from "../../../core/enums";
import { IEntityMeta } from "../interfaces";

// TODO: ### Add other entities
export const EntityMeta: IEntityMeta = {
    user: EntityName.USER,
    admin: EntityName.USER,
    vendor: EntityName.USER,
    planner: EntityName.USER,
    vendorType: EntityName.VENDOR_TYPE,
};
