// noinspection JSUnusedGlobalSymbols

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Errors } from "hichchi-nestjs-common/responses";
import { storage } from "../../core/configs/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import configuration from "../../core/configs/configuration";

const DEFAULTS_DIR = "files";
const FIREBASE_STORAGE_URL = "https://firebasestorage.googleapis.com";

@Injectable()
export class FileUploadService {
    async uploadFile(file: Express.Multer.File, dir = DEFAULTS_DIR): Promise<string> {
        try {
            const ext = file.originalname.split(".").pop();
            const sanitizedDir = `${configuration().firebase.env}/${dir}`
                .split(/[\\/]/)
                .map(p => p.trim())
                .filter(p => p.length > 0)
                .join("/");

            const filePath = `${sanitizedDir ? sanitizedDir + "/" : ""}${Date.now()}.${ext}`;
            const storageRef = ref(storage, filePath);
            const result = await uploadBytes(storageRef, file.buffer);

            return await getDownloadURL(result.ref);
        } catch (err) {
            throw new InternalServerErrorException(Errors.E_500_FILE_UPLOAD);
        }
    }

    async uploadFiles(files: Express.Multer.File[], dir = DEFAULTS_DIR): Promise<string[]> {
        const urls: string[] = [];
        try {
            for await (const file of files) {
                urls.push(await this.uploadFile(file, dir));
            }

            return urls;
        } catch (error) {
            throw new InternalServerErrorException(Errors.E_500_FILE_UPLOAD);
        }
    }

    async deleteFile(url: string): Promise<boolean> {
        try {
            await deleteObject(ref(storage, url));
            return true;
        } catch (error) {
            throw new InternalServerErrorException(Errors.E_500_FILE_DELETE);
        }
    }

    async deleteFiles(urls: string[]): Promise<boolean> {
        try {
            for await (const url of urls) {
                await deleteObject(ref(storage, url));
            }

            return true;
        } catch (error) {
            throw new InternalServerErrorException(Errors.E_500_FILE_DELETE);
        }
    }

    async replaceFile(url: string, file: Express.Multer.File): Promise<string> {
        try {
            await this.deleteFile(url);
            return this.uploadFile(file);
        } catch (error) {
            throw new InternalServerErrorException(Errors.E_500_FILE_UPLOAD);
        }
    }

    isUploadedFile(url?: string): boolean {
        if (!url) {
            return false;
        }
        return url.startsWith(FIREBASE_STORAGE_URL) && url.includes(configuration().firebase.storageBucket);
    }
}
