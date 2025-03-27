import { colors } from "./colorsAndImg";
import { throwError } from "./throwError";

export const validateColor = (background_color: string | null) => {
    console.log("Validating color:", background_color);

    // Allow NULL or undefined values
    if (background_color === null || background_color === undefined) return true;

    // Ensure background_color is a string
    if (typeof background_color !== "string") {
        throwError("Invalid background color: Must be a string", 400);
    }

    // Trim and check if it's empty (This is redundant now, since we handle `""` above)
    const trimmedColor = background_color.trim();
    
    // Regex patterns for color validation
    const HEX_REGEX = /^#([A-Fa-f0-9]{6})$/;
    const RGB_REGEX = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/;
    const HSL_REGEX = /^hsl\((\d{1,3}),\s?(\d{1,3})%,\s?(\d{1,3})%\)$/;

    // Check if the color is valid
    const isValid = (
        colors.includes(trimmedColor.toLowerCase()) ||
        HEX_REGEX.test(trimmedColor) ||
        RGB_REGEX.test(trimmedColor) ||
        HSL_REGEX.test(trimmedColor)
    );

    if (!isValid) {
        throwError(`Invalid background color: '${background_color}' is not a valid color`, 400);
    }

  
};
