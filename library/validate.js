import { validationResult } from "express-validator";

export function validate(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).send({ message: errors.array()[0].msg });
}
