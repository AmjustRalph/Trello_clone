import { throwError } from "../utils/throwError";
import {Request, Response, NextFunction} from "express"
import { validateColor } from "../utils/validateColor";
import { validateBgImg } from "../utils/validateBgImg";
import { validateName } from "../utils/validateName";

export const validateBoards = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throwError("Request body is missing", 400);
        }

        let { name, background_color, background_image } = req.body;

        validateName(name);
        if (background_color === "") {
                throwError("Couldn't not find background color", 500)
            }
        // Validate background color or image only if provided
        if (background_color) {
            validateColor(background_color);
        }

        if (background_image === "") {
            throwError("Couldn't not find background image", 500)
        }
        if (background_image) {
            validateBgImg(background_image);
        }

        next();
    } catch (error) {
        next(error);
    }
};



