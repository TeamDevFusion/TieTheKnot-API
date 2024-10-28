import { Injectable } from "@nestjs/common";
import { CrudService } from "hichchi-nestjs-crud";
import { VendorTypeEntity } from "../entities";
import { VendorTypeRepository } from "../repositories";

@Injectable()
export class VendorTypeService extends CrudService<VendorTypeEntity> {
    constructor(readonly userRepository: VendorTypeRepository) {
        super(userRepository, "vendor type");
    }
}
