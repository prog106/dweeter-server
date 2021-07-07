import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secret: required("JWT_SECRET"),
        expires: parseInt(required("JWT_EXPIRES_SEC", 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
    },
    db: {
        host: required("DB_HOST"),
        user: required("DB_USER"),
        password: required("DB_PASSWORD"),
        database: required("DB_DATABASE"),
    },
    port: parseInt(required("PORT", 8080)),
    cors: {
        allowedOrigin: required("CORS_ALLOWED_ORIGIN"),
    },
    csrf: {
        plainToken: required("CSRF_SECRET_KEY"),
    },
    rateLimit: {
        windowMs: 1000 * 60, // 1분
        maxRequest: 100, // 100번
        // keyGenerator: (req, res) => {
        //     return "dwitter";
        // },
    },
};
