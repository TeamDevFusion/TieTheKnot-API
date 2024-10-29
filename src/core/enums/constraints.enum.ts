// Ex: ASSESSMENT_SUBMISSION_ASSESSMENT = "FK_assessmentSubmission_assessment",
export enum FKConstraint {
    USER_VENDOR_TYPE = "FK_user_vendorType",
}

// Ex: PRODUCT_CATEGORY_NAME = "UNIQUE_productCategory_name",
export enum UNIQUEConstraint {
    USER_EMAIL = "UNIQUE_user_email",
    USER_PHONE = "UNIQUE_user_phone",
    VENDOR_TYPE_NAME = "UNIQUE_vendorType_name",
}
