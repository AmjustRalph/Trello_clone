import {Request, Response, NextFunction } from "express";
import { colors } from "./colorsAndImg";
import { throwError } from "./throwError";

export const validateName = (name: string) => {
    const valid = /^[a-zA-Z\s'-]+$/.test(name.trim());
    if (name.trim().length < 4 || !valid) {
      throwError("Name must be 4 characters and more with only letters, spaces, hyphens, or apostrophes", 400);
    }
  };
  
  export const validateColor = (background_color: string) => {
    const HEX_REGEX = /^#([A-Fa-f0-9]{6})$/;
    const RGB_REGEX = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/;
    const HSL_REGEX = /^hsl\((\d{1,3}),\s?(\d{1,3})%,\s?(\d{1,3})%\)$/;
  
    if (!background_color.trim() || !(colors.includes(background_color.toLowerCase()) || HEX_REGEX.test(background_color) || RGB_REGEX.test(background_color) || HSL_REGEX.test(background_color))) {
      throwError(`Invalid background color: '${background_color}' is not valid`, 400);
    }
  };
  
  export const validateBgImg = (background_image: string) => {
    if (typeof background_image !== "string" || !background_image.trim() || background_image.length < 4) {
      throwError("Invalid background image: Must be a valid non-empty string", 400);
    }
  };
  


export const validateEmail = (email: string) => {
    if (!email?.trim()) throwError("Email must be a non-empty string", 400);

    const [localPart, domain] = email.split("@");
    if (!domain) throwError("Invalid email format: Must contain exactly one '@' symbol", 400);

    if (/^\d+$/.test(localPart)) throwError("Invalid email: Local part must not contain only numbers", 422);
    if (localPart.length < 5) throwError("Invalid email: Local part must be more than 5 characters", 422);
};

export const validPassword = (password: string) => {
    if (!password?.trim()) throwError("Password must be a non-empty string", 400);
    if (password.length < 8) throwError("Password must be at least 8 characters long", 400);
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) throwError("Password must contain at least one special character", 400);
    if (/^[!@#$%^&*(),.?":{}|<>]+$/.test(password)) throwError("Password cannot contain only special characters", 400);
};

export const validateUserInput = (name: string) => {
    if (!name?.trim()) throwError("Invalid name: Must be a non-empty string", 400);
    if (/\d/.test(name)) throwError("Invalid name: Must not contain numbers", 422);
    if (!/^[a-zA-Z ]+$/.test(name)) throwError("Invalid name: Must contain only letters", 422);
    if (name.trim().length < 2) throwError("Invalid name: Must be at least 2 characters", 422);
};


export const validateBoards = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, background_color, background_image } = req.body;
      validateName(name);
      background_color && validateColor(background_color);
      background_image && validateBgImg(background_image);
  
      next();
    } catch (error) {
      next(error);
    }
  };