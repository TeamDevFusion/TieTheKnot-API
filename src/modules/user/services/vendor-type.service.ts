import { Injectable } from "@nestjs/common";
import { CrudService } from "hichchi-nestjs-crud";
import { VendorTypeEntity } from "../entities";
import { VendorTypeRepository } from "../repositories";
import { CreateVendorTypeDto, UpdateVendorTypeDto } from "../dtos";
import { MulterFile } from "../../file-upload/file-upload.types";
import { IVendorTypeEntity } from "../interfaces";
import { FileUploadService } from "../../file-upload/file-upload.service";
import { TokenUser } from "../../../core/types/auth.types";
import { IStatusResponse } from "hichchi-nestjs-common/interfaces";

@Injectable()
export class VendorTypeService extends CrudService<VendorTypeEntity> {
    constructor(
        readonly vendorTypeRepository: VendorTypeRepository,
        private readonly fileUploadService: FileUploadService,
    ) {
        super(vendorTypeRepository, "vendor type");
    }

    saveVendorType(dto: CreateVendorTypeDto, createdBy: TokenUser, icon?: MulterFile): Promise<IVendorTypeEntity> {
        return this.transaction(async () => {
            if (icon) {
                dto.icon = await this.fileUploadService.uploadFile(icon);
            }

            return this.save(dto, undefined, createdBy);
        });
    }

    updateVendorType(
        id: string,
        dto: UpdateVendorTypeDto,
        updatedBy: TokenUser,
        icon?: MulterFile,
    ): Promise<IVendorTypeEntity> {
        return this.transaction(async () => {
            const vendorType = await this.get(id);
            if (icon) {
                dto.icon = await this.fileUploadService.uploadFile(icon);
            } else if (dto.icon === null && this.fileUploadService.isUploadedFile(vendorType.icon)) {
                await this.fileUploadService.deleteFile(vendorType.icon);
            }

            return this.update(id, dto, undefined, updatedBy);
        });
    }

    deleteVendorType(id: string, deletedBy: TokenUser): Promise<IVendorTypeEntity> {
        return this.transaction(async () => {
            const vendorType = await this.get(id);
            if (this.fileUploadService.isUploadedFile(vendorType.icon)) {
                await this.fileUploadService.deleteFile(vendorType.icon);
            }

            return this.delete(id, deletedBy);
        });
    }

    deleteVendorByIds(ids: string[], deletedBy: TokenUser): Promise<IStatusResponse> {
        return this.transaction(async () => {
            const vendorTypes = await this.getByIds({ ids });
            const urls = vendorTypes
                .map(vendorType => vendorType.icon)
                .filter(icon => this.fileUploadService.isUploadedFile(icon));
            await this.fileUploadService.deleteFiles(urls);
            return this.deleteByIds(ids, deletedBy);
        });
    }
}
