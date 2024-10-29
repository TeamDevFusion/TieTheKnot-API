// noinspection JSUnresolvedReference

import * as dotenv from "dotenv";
import { DatabaseType } from "typeorm";
import { toNumber } from "hichchi-utils";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
    app: {
        port: Number(process.env.PORT || process.env.APP_PORT) || 3000,
        version: process.env.APP_VERSION || "v1",
        title: process.env.APP_TITLE || "v1",
        allowedOrigins: String(process.env.APP_ALLOWED_ORIGINS).split(",") || [],
        webUrl: process.env.APP_WEB_URL || "http://localhost:4200",
        apiUrl: process.env.APP_API_URL || "http://localhost:3000",
        environment: process.env.NODE_ENV || "development",
        defaultPassword: process.env.APP_DEFAULT_PASSWORD || "user@123",
        config: {},
    },
    swagger: {
        description: process.env.SWAGGER_DESCRIPTION || "API Documentation",
    },
    database: {
        type: (process.env.DATABASE_TYPE || "mysql") as DatabaseType,
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "root",
        schema: process.env.DATABASE_SCHEMA || "ttk",
        port: toNumber(process.env.DATABASE_PORT) || 3306,
        charset: "utf8mb4",
        synchronize: process.env.DATABASE_SYNC === "true",
        ssl: process.env.DATABASE_SSL === "true",
        sslMode: process.env.DATABASE_SSL_MODE || "require",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: toNumber(process.env.JWT_EXP) || 60 * 60 * 24,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: toNumber(process.env.JWT_REFRESH_EXP) || 60 * 60 * 24 * 30,
    },
    cookies: {
        secret: process.env.APP_COOKIE_SECRET || "ttk-secret",
        sameSite: (process.env.APP_COOKIE_SAME_SITE || "none") as boolean | "none" | "lax" | "strict",
        secure: process.env.APP_COOKIE_INSECURE !== "true",
    },
    redis: {
        prefix: process.env.REDIS_PREFIX || "",
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        // eslint-disable-next-line camelcase
        auth_pass: process.env.REDIS_PASSWORD,
        ttl: Number(process.env.REDIS_CACHE_TTL) || 7890000,
        url: process.env.REDIS_URL || undefined,
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE === "true",
        ignoreTLS: !(process.env.SMTP_SECURE === "true"),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        from: process.env.SMTP_FROM,
    },
    regex: {
        email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    firebase: {
        env: process.env.FIREBASE_ENV,
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
});
