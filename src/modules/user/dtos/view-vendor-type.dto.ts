import { IViewDto } from "hichchi-nestjs-common/interfaces";
import { IUserEntity, IVendorTypeEntity, IViewVendorTypeDto } from "../interfaces";
import { removeLogs } from "../../../core/utils/utils";
import { ViewUserDto } from "./view-user.dto";

export class ViewVendorTypeDto implements IViewDto {
    formatDataSet(entity?: IVendorTypeEntity): IViewVendorTypeDto {
        if (!entity) {
            return null;
        }

        const viewUserDto = new ViewUserDto();

        return {
            vendors: entity.vendors?.map((vendor: IUserEntity) => viewUserDto.formatDataSet(vendor)),
            ...removeLogs(entity),
        };
    }
}
