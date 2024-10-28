import { IViewDto } from "hichchi-nestjs-common/interfaces";
import { IUser, IVewUserDto } from "../interfaces";
import { Role } from "../../../core/enums/role.enum";
import { removeLogs } from "../../../core/utils/utils";

export class ViewUserDto implements IViewDto {
    formatDataSet(entity?: IUser): IVewUserDto {
        if (!entity) {
            return null;
        }

        const user: IVewUserDto = {
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
        }

        delete user.client;
        delete user.vendor;
        delete user.password;
        delete user.salt;

        return removeLogs(user);
    }
}
