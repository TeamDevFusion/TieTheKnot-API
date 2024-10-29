import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { Endpoint, EntityName } from "../../../core/enums";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard, RoleGuard } from "hichchi-nestjs-auth/auth/guards";
import { CurrentUser, Roles } from "hichchi-nestjs-auth/auth/decorators";
import { Role } from "../../../core/enums/role.enum";
import {
    CreateClientDto,
    CreateUserDto,
    CreateVendorDto,
    CreateVendorTypeDto,
    UpdateClientDto,
    UpdateUserDto,
    UpdateVendorDto,
    UpdateVendorTypeDto,
    ViewUserDto,
    ViewVendorTypeDto,
} from "../dtos";
import { TokenUser } from "../../../core/types/auth.types";
import { IUserEntity, IVendorTypeEntity } from "../interfaces";
import { AdminCan } from "../enums";
import { UserService, VendorTypeService } from "../services";
import { IPagination, IStatusResponse } from "hichchi-nestjs-common/interfaces";
import { Filters, Pager, Search, Sorter, SortOptions } from "hichchi-nestjs-crud";
import { QuerySafeDeepPartial } from "hichchi-nestjs-common/types";
import { PaginatedResponse } from "hichchi-nestjs-crud/classes/paginated-response";
import { UseTransformInterceptor } from "hichchi-nestjs-common/decorators";
import { BulkDeleteDto } from "hichchi-nestjs-common/dtos";
import { ApiDocs, ApiGetAllDocs } from "../../../swagger/decorators";
import { srDeleted, srPaginated } from "../../../swagger/utils/swagger-data.utils";
import {
    paramId,
    srAdmin,
    srClient,
    srE400,
    srE401,
    srE404,
    srVendor,
    srVendorType,
} from "../../../swagger/utils/swagger-responses";
import { UseUserLogInterceptor } from "../../app-config/decorators";
import { ParamType } from "../../app-config/enums";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterFile } from "../../file-upload/file-upload.types";

@Controller(Endpoint.USER)
@ApiTags("User")
@ApiBearerAuth()
@ApiBadRequestResponse(srE400)
@ApiUnauthorizedResponse(srE401)
@ApiNotFoundResponse(srE404)
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly vendorTypeService: VendorTypeService,
    ) {}

    @Get("admin/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Get a user by ID", srAdmin, paramId)
    @UseUserLogInterceptor(AdminCan.USER_GET, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    getAdmin(@Param("id") id: string): Promise<IUserEntity> {
        return this.userService.getUser(id, Role.ADMIN);
    }

    @Get("admin")
    @Roles(Role.ADMIN)
    @ApiGetAllDocs("Get all admin users", srPaginated([srAdmin]))
    @UseTransformInterceptor(new ViewUserDto())
    async getUsers(
        @Pager() pagination?: IPagination,
        @Sorter() sort?: SortOptions<IUserEntity>,
        @Search() search?: QuerySafeDeepPartial<IUserEntity>,
        @Filters() filters?: QuerySafeDeepPartial<IUserEntity>,
    ): Promise<PaginatedResponse<IUserEntity> | IUserEntity[]> {
        return (await this.userService.getMany({
            pagination,
            sort,
            search,
            filters,
        })) as unknown as PaginatedResponse<IUserEntity> | IUserEntity[];
    }

    @Post("admin")
    @Roles(Role.ADMIN)
    @ApiDocs("Create a new admin", srAdmin)
    @UseUserLogInterceptor(AdminCan.USER_CREATE, ParamType.RESPONSE, "id")
    @UseTransformInterceptor(new ViewUserDto())
    createAdmin(@CurrentUser() user: TokenUser, @Body() dto: CreateUserDto): Promise<IUserEntity> {
        return this.userService.createUser(dto, Role.ADMIN, user);
    }

    @Patch("admin/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Update a admin user", srAdmin, paramId)
    @UseUserLogInterceptor(AdminCan.USER_UPDATE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    updateAdmin(
        @CurrentUser() user: TokenUser,
        @Param("id") id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<IUserEntity> {
        return this.userService.updateUser(id, dto, Role.ADMIN, user);
    }

    @Delete("admin/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Delete a user", srAdmin, paramId)
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    deleteAdmin(@CurrentUser() user: TokenUser, @Param("id") id: string): Promise<IUserEntity> {
        return this.userService.deleteUser(id, Role.ADMIN, user);
    }

    @Post("admin/delete")
    @Roles(Role.ADMIN)
    @ApiDocs("Delete multiple admin users", srDeleted(EntityName.USER))
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.BODY, "ids")
    deleteAdmins(@CurrentUser() user: TokenUser, @Body() { ids }: BulkDeleteDto): Promise<IStatusResponse> {
        return this.userService.deleteUserByIds(ids, Role.ADMIN, user);
    }

    @Get("client/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Get a user by ID", srClient, paramId)
    @UseUserLogInterceptor(AdminCan.USER_GET, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    getClient(@Param("id") id: string): Promise<IUserEntity> {
        return this.userService.getUser(id, Role.USER);
    }

    @Get("client")
    @Roles(Role.ADMIN, Role.VENDOR, Role.PLANNER)
    @ApiGetAllDocs("Get all clients", srPaginated([srClient]))
    @UseTransformInterceptor(new ViewUserDto())
    async getClients(
        @Pager() pagination?: IPagination,
        @Sorter() sort?: SortOptions<IUserEntity>,
        @Search() search?: QuerySafeDeepPartial<IUserEntity>,
        @Filters() filters?: QuerySafeDeepPartial<IUserEntity>,
    ): Promise<PaginatedResponse<IUserEntity> | IUserEntity[]> {
        filters.role = Role.USER;
        return (await this.userService.getMany({
            pagination,
            sort,
            search,
            filters,
        })) as unknown as PaginatedResponse<IUserEntity> | IUserEntity[];
    }

    @Post("client")
    @Roles(Role.ADMIN, Role.VENDOR, Role.PLANNER)
    @ApiDocs("Create a new client", srClient)
    @UseUserLogInterceptor(AdminCan.USER_CREATE, ParamType.RESPONSE, "id")
    @UseTransformInterceptor(new ViewUserDto())
    createClient(@CurrentUser() user: TokenUser, @Body() dto: CreateClientDto): Promise<IUserEntity> {
        return this.userService.createUser(dto, Role.USER, user);
    }

    @Patch("client/:id")
    @Roles(Role.ADMIN, Role.VENDOR, Role.PLANNER)
    @ApiDocs("Update a client", srClient, paramId)
    @UseUserLogInterceptor(AdminCan.USER_UPDATE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    updateClient(
        @CurrentUser() user: TokenUser,
        @Param("id") id: string,
        @Body() dto: UpdateClientDto,
    ): Promise<IUserEntity> {
        return this.userService.updateUser(id, dto, Role.USER, user);
    }

    @Delete("client/:id")
    @Roles(Role.ADMIN, Role.VENDOR, Role.PLANNER)
    @ApiDocs("Delete a user", srClient, paramId)
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    deleteClient(@CurrentUser() user: TokenUser, @Param("id") id: string): Promise<IUserEntity> {
        return this.userService.deleteUser(id, Role.USER, user);
    }

    @Post("client/delete")
    @Roles(Role.ADMIN, Role.VENDOR, Role.PLANNER)
    @ApiDocs("Delete multiple admin users", srDeleted(EntityName.USER))
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.BODY, "ids")
    deleteClients(@CurrentUser() user: TokenUser, @Body() { ids }: BulkDeleteDto): Promise<IStatusResponse> {
        return this.userService.deleteUserByIds(ids, Role.USER, user);
    }

    @Get("vendor/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Get a user by ID", srVendor, paramId)
    @UseUserLogInterceptor(AdminCan.USER_GET, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    getVendor(@Param("id") id: string): Promise<IUserEntity> {
        return this.userService.getUser(id, Role.VENDOR);
    }

    @Get("vendor")
    @Roles(Role.ADMIN, Role.USER, Role.PLANNER)
    @ApiGetAllDocs("Get all vendors", srPaginated([srVendor]))
    @UseTransformInterceptor(new ViewUserDto())
    async getVendors(
        @Pager() pagination?: IPagination,
        @Sorter() sort?: SortOptions<IUserEntity>,
        @Search() search?: QuerySafeDeepPartial<IUserEntity>,
        @Filters() filters?: QuerySafeDeepPartial<IUserEntity>,
    ): Promise<PaginatedResponse<IUserEntity> | IUserEntity[]> {
        filters.role = Role.VENDOR;
        return (await this.userService.getMany({
            pagination,
            sort,
            search,
            filters,
            relations: ["vendorType"],
        })) as unknown as PaginatedResponse<IUserEntity> | IUserEntity[];
    }

    @Post("vendor")
    @Roles(Role.ADMIN, Role.USER, Role.PLANNER)
    @ApiDocs("Create a new vendor", srVendor)
    @UseUserLogInterceptor(AdminCan.USER_CREATE, ParamType.RESPONSE, "id")
    @UseTransformInterceptor(new ViewUserDto())
    createVendor(@CurrentUser() user: TokenUser, @Body() dto: CreateVendorDto): Promise<IUserEntity> {
        return this.userService.createUser(dto, Role.VENDOR, user);
    }

    @Patch("vendor/:id")
    @Roles(Role.ADMIN, Role.USER, Role.PLANNER)
    @ApiDocs("Update a vendor", srVendor, paramId)
    @UseUserLogInterceptor(AdminCan.USER_UPDATE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    updateVendor(
        @CurrentUser() user: TokenUser,
        @Param("id") id: string,
        @Body() dto: UpdateVendorDto,
    ): Promise<IUserEntity> {
        return this.userService.updateUser(id, dto, Role.VENDOR, user);
    }

    @Delete("vendor/:id")
    @Roles(Role.ADMIN, Role.USER, Role.PLANNER)
    @ApiDocs("Delete a user", srVendor, paramId)
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    deleteVendor(@CurrentUser() user: TokenUser, @Param("id") id: string): Promise<IUserEntity> {
        return this.userService.deleteUser(id, Role.VENDOR, user);
    }

    @Post("vendor/delete")
    @Roles(Role.ADMIN, Role.USER, Role.PLANNER)
    @ApiDocs("Delete multiple admin users", srDeleted(EntityName.USER))
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.BODY, "ids")
    deleteVendors(@CurrentUser() user: TokenUser, @Body() { ids }: BulkDeleteDto): Promise<IStatusResponse> {
        return this.userService.deleteUserByIds(ids, Role.VENDOR, user);
    }

    @Get("planner/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Get a user by ID", srVendor, paramId)
    @UseUserLogInterceptor(AdminCan.USER_GET, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    getUser(@Param("id") id: string): Promise<IUserEntity> {
        return this.userService.getUser(id, Role.PLANNER);
    }

    @Get("planner")
    @Roles(Role.ADMIN, Role.USER, Role.VENDOR)
    @ApiGetAllDocs("Get all planners", srPaginated([srVendor]))
    @UseTransformInterceptor(new ViewUserDto())
    async getPlanners(
        @Pager() pagination?: IPagination,
        @Sorter() sort?: SortOptions<IUserEntity>,
        @Search() search?: QuerySafeDeepPartial<IUserEntity>,
        @Filters() filters?: QuerySafeDeepPartial<IUserEntity>,
    ): Promise<PaginatedResponse<IUserEntity> | IUserEntity[]> {
        filters.role = Role.PLANNER;
        return (await this.userService.getMany({
            pagination,
            sort,
            search,
            filters,
        })) as unknown as PaginatedResponse<IUserEntity> | IUserEntity[];
    }

    @Post("planner")
    @Roles(Role.ADMIN, Role.USER, Role.VENDOR)
    @ApiDocs("Create a new planner", srVendor)
    @UseUserLogInterceptor(AdminCan.USER_CREATE, ParamType.RESPONSE, "id")
    @UseTransformInterceptor(new ViewUserDto())
    createPlanner(@CurrentUser() user: TokenUser, @Body() dto: CreateUserDto): Promise<IUserEntity> {
        return this.userService.createUser(dto, Role.PLANNER, user);
    }

    @Patch("planner/:id")
    @Roles(Role.ADMIN, Role.USER, Role.VENDOR)
    @ApiDocs("Update a vendor", srVendor, paramId)
    @UseUserLogInterceptor(AdminCan.USER_UPDATE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    updatePlanner(
        @CurrentUser() user: TokenUser,
        @Param("id") id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<IUserEntity> {
        return this.userService.updateUser(id, dto, Role.PLANNER, user);
    }

    @Delete("planner/:id")
    @Roles(Role.ADMIN, Role.USER, Role.VENDOR)
    @ApiDocs("Delete a user", srVendor, paramId)
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewUserDto())
    deletePlanner(@CurrentUser() user: TokenUser, @Param("id") id: string): Promise<IUserEntity> {
        return this.userService.deleteUser(id, Role.PLANNER, user);
    }

    @Post("planner/delete")
    @Roles(Role.ADMIN, Role.USER, Role.VENDOR)
    @ApiDocs("Delete multiple admin users", srDeleted(EntityName.USER))
    @UseUserLogInterceptor(AdminCan.USER_DELETE, ParamType.BODY, "ids")
    deletePlanners(@CurrentUser() user: TokenUser, @Body() { ids }: BulkDeleteDto): Promise<IStatusResponse> {
        return this.userService.deleteUserByIds(ids, Role.PLANNER, user);
    }

    @Get("vendor-type/:id")
    @ApiDocs("Get a vendor type by ID", srVendorType, paramId)
    @UseUserLogInterceptor(AdminCan.VENDOR_TYPE_GET, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewVendorTypeDto())
    getVendorType(@Param("id") id: string): Promise<IVendorTypeEntity> {
        return this.vendorTypeService.get(id);
    }

    @Get("vendor-type")
    @ApiGetAllDocs("Get all vendor types", srPaginated([srVendorType]))
    @UseTransformInterceptor(new ViewVendorTypeDto())
    async getVendorTypes(
        @Pager() pagination?: IPagination,
        @Sorter() sort?: SortOptions<IVendorTypeEntity>,
        @Search() search?: QuerySafeDeepPartial<IVendorTypeEntity>,
        @Filters() filters?: QuerySafeDeepPartial<IVendorTypeEntity>,
    ): Promise<PaginatedResponse<IVendorTypeEntity> | IVendorTypeEntity[]> {
        return (await this.vendorTypeService.getMany({
            pagination,
            sort,
            search,
            filters,
        })) as unknown as PaginatedResponse<IVendorTypeEntity> | IVendorTypeEntity[];
    }

    @Post("vendor-type")
    @Roles(Role.ADMIN)
    @ApiDocs("Create a new vendor type", srVendorType)
    @UseUserLogInterceptor(AdminCan.VENDOR_TYPE_CREATE, ParamType.RESPONSE, "id")
    @UseTransformInterceptor(new ViewVendorTypeDto())
    @UseInterceptors(FileInterceptor("icon"))
    createVendorType(
        @CurrentUser() user: TokenUser,
        @Body() dto: CreateVendorTypeDto,
        @UploadedFile() icon?: MulterFile,
    ): Promise<IVendorTypeEntity> {
        return this.vendorTypeService.saveVendorType(dto, user, icon);
    }

    @Patch("vendor-type/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Update a vendor type", srVendorType, paramId)
    @UseUserLogInterceptor(AdminCan.VENDOR_TYPE_UPDATE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewVendorTypeDto())
    @UseInterceptors(FileInterceptor("icon"))
    updateVendorType(
        @CurrentUser() user: TokenUser,
        @Param("id") id: string,
        @Body() dto: UpdateVendorTypeDto,
        @UploadedFile() icon?: MulterFile,
    ): Promise<IVendorTypeEntity> {
        return this.vendorTypeService.updateVendorType(id, dto, user, icon);
    }

    @Delete("vendor-type/:id")
    @Roles(Role.ADMIN)
    @ApiDocs("Delete a vendor type", srVendorType, paramId)
    @UseUserLogInterceptor(AdminCan.VENDOR_TYPE_DELETE, ParamType.PATH, "id")
    @UseTransformInterceptor(new ViewVendorTypeDto())
    deleteVendorType(@CurrentUser() user: TokenUser, @Param("id") id: string): Promise<IVendorTypeEntity> {
        return this.vendorTypeService.deleteVendorType(id, user);
    }

    @Post("vendor-type/delete")
    @Roles(Role.ADMIN)
    @ApiDocs("Delete multiple vendor types", srDeleted(EntityName.VENDOR_TYPE))
    @UseUserLogInterceptor(AdminCan.VENDOR_TYPE_DELETE, ParamType.BODY, "ids")
    deleteVendorTypes(@CurrentUser() user: TokenUser, @Body() { ids }: BulkDeleteDto): Promise<IStatusResponse> {
        return this.vendorTypeService.deleteVendorByIds(ids, user);
    }
}
