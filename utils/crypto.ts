import "server-only";
import crypto from "crypto";
import "dotenv/config";


const KEY = Buffer.from(
    process.env.SESSION_KEY_ENCRYPTION_KEY!,
    "hex",
);

if (KEY.length !== 32) {
    throw new Error(
        "SESSION_KEY_ENCRYPTION_KEY must be a 32-byte hex string.",
    );
}

export interface EncryptedSession {

    version: number;

    ciphertext: string;

    iv: string;

    tag: string;

}

/* -------------------------------------------------------------------------- */
/* Encrypt                                                                     */
/* -------------------------------------------------------------------------- */

export function encryptPrivateKey(
    privateKey: `0x${string}`,
): EncryptedSession {

    const iv =
        crypto.randomBytes(12);

    const cipher =
        crypto.createCipheriv(
            "aes-256-gcm",
            KEY,
            iv,
        );

    const ciphertext =
        Buffer.concat([
            cipher.update(privateKey, "utf8"),
            cipher.final(),
        ]);

    return {

        version: 1,

        ciphertext:
            ciphertext.toString("hex"),

        iv:
            iv.toString("hex"),

        tag:
            cipher
                .getAuthTag()
                .toString("hex"),

    };
}

/* -------------------------------------------------------------------------- */
/* Decrypt                                                                     */
/* -------------------------------------------------------------------------- */

export function decryptPrivateKey(
    encrypted: EncryptedSession,
): `0x${string}` {

    if (encrypted.version !== 1) {
        throw new Error(
            `Unsupported encrypted session version: ${encrypted.version}`,
        );
    }

    const decipher =
        crypto.createDecipheriv(
            "aes-256-gcm",
            KEY,
            Buffer.from(
                encrypted.iv,
                "hex",
            ),
        );

    decipher.setAuthTag(
        Buffer.from(
            encrypted.tag,
            "hex",
        ),
    );

    const plaintext =
        Buffer.concat([

            decipher.update(
                Buffer.from(
                    encrypted.ciphertext,
                    "hex",
                ),
            ),

            decipher.final(),

        ]);

    return plaintext.toString() as `0x${string}`;
}