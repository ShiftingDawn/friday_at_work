import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {env} from "$env/dynamic/private";

const globalForStorage = globalThis as unknown as { storage?: S3Client };

export const storage = globalForStorage.storage ?? new S3Client({
    region: "auto",
    endpoint: env.S3_API_URL,
    credentials: {
        accessKeyId: env.S3_ACC_ID,
        secretAccessKey: env.S3_TOKEN
    },
    requestStreamBufferSize: 32 * 1024,
});

if (process.env.NODE_ENV !== "production") {
    globalForStorage.storage = storage;
}

export async function upload(file: File, name: string, contentType?: string): Promise<void> {
    const command = new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: name,
        ContentType: contentType,
        Body: await file.bytes(),
        ACL: "public-read",
    });
    await storage.send(command);
}