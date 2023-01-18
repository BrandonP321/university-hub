import * as Yup from "yup";
import { RegexUtils } from "./RegexUtils";

/**
 * Utility class for schema validation
 */
export class SchemaUtils {
    public static emailSchema = Yup.string().email("Enter a valid email address");
    public static phoneSchema = Yup.string().matches(RegexUtils.phoneRegex, "Enter a valid phone number");

    public static passwordSchema = Yup.string()
        .min(8, "Password must be atleast 8 characters long")
        .matches(/(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
        .matches(/(?=.*[a-z])/, "Password must contain at least 1 lowercase letter")
        .matches(/(?=.*\d)/, "Password must contain at least 1 number");

    public static rgbColorSchema = Yup.string().matches(RegexUtils.rgbColorRegex, "Invalid color")
}
