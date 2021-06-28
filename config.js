import dotenv from "dotenv";
dotenv.config();

export const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES_SEC,
    },
    bcrypt: {
        saltRounds: process.env.BCRYPT_SALT_ROUNDS,
    },
};
