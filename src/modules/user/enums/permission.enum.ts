// noinspection JSUnusedGlobalSymbols

export enum AdminCan {
    ADMIN_GET = "admin_get",
    ADMIN_LIST = "admin_list",
    ADMIN_CREATE = "admin_create",
    ADMIN_UPDATE = "admin_update",
    ADMIN_DELETE = "admin_delete",
    ADMIN_ROLE = "admin_role",

    USER_GET = "user_get",
    USER_GET_SELF = "user_getSelf",
    USER_LIST = "user_list",
    USER_CREATE = "user_create",
    USER_UPDATE = "user_update",
    USER_UPDATE_SELF = "user_updateSelf",
    USER_DELETE = "user_delete",
    USER_ROLE = "user_role",

    VENDOR_TYPE_GET = "vendorType_get",
    VENDOR_TYPE_LIST = "vendorType_list",
    VENDOR_TYPE_CREATE = "vendorType_create",
    VENDOR_TYPE_UPDATE = "vendorType_update",
    VENDOR_TYPE_DELETE = "vendorType_delete",
}

export enum UserCan {
    COMPANY_GET_SELF = "company_getSelf",
    COMPANY_CREATE_SELF = "company_createSelf",
    COMPANY_UPDATE_SELF = "company_updateSelf",
    COMPANY_CHECK_SUBDOMAIN = "company_check_subdomain",
}
