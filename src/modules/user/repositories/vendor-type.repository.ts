import { BaseRepository, HichchiRepository } from "hichchi-nestjs-crud";
import { VendorTypeEntity } from "../entities";

@HichchiRepository(VendorTypeEntity)
export class VendorTypeRepository extends BaseRepository<VendorTypeEntity> {}
