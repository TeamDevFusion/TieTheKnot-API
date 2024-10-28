import { IViewDto } from "hichchi-nestjs-common/interfaces";
import { IUser, IVendorType } from "../interfaces";
import { removeLogs } from "../../../core/utils/utils";
import { ViewUserDto } from "./view-user.dto";

export class ViewVendorTypeDto implements IViewDto {
    formatDataSet(entity?: IVendorType): Partial<IVendorType> {
        if (!entity) {
            return null;
        }

        const viewUserDto = new ViewUserDto();

        return {
            vendors: entity.vendors?.map((vendor: IUser) => viewUserDto.formatDataSet(vendor)),
            ...removeLogs(entity),
        };
    }
}
