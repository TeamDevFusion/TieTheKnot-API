import { IViewDto } from "hichchi-nestjs-common/interfaces";
import { IUserEntity, IViewUserDto } from "../interfaces";
import { Role } from "../../../core/enums/role.enum";
import { removeLogs } from "../../../core/utils/utils";
import { ViewVendorTypeDto } from "./view-vendor-type.dto";

export class ViewUserDto implements IViewDto {
    formatDataSet(entity?: IUserEntity): IViewUserDto {
        if (!entity) {
            return null;
        }

        const viewVendorTypeDto = new ViewVendorTypeDto();

        const user: IViewUserDto = {
            ...entity,
        };

        if (entity.role === Role.USER) {
            user.planStatus = entity.client?.planStatus;
            user.partnerFirstName = entity.client?.partnerFirstName;
            user.partnerLastName = entity.client?.partnerLastName;
        }

        if (entity.role === Role.VENDOR) {
            user.companyName = entity.vendor?.companyName;
            user.address = entity.vendor?.address;
            user.city = entity.vendor?.city;
            user.phone = entity.vendor?.phone;
            user.vendorTypeId = entity.vendor?.vendorTypeId;
            user.vendorType = viewVendorTypeDto.formatDataSet(entity?.vendorType);
        }

        delete user.client;
        delete user.vendor;
        delete (user as IUserEntity).password;
        delete (user as IUserEntity).salt;

        return removeLogs(user);
    }
}
