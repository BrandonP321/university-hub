import { SchemaUtils } from "./SchemaUtils";
import * as Yup from "yup";

export type SiteColorKeys = "primaryBgColor" | "primaryTextColor" | "secondaryBgColor" | "secondaryTextColor";
export type SiteColorsMap = {[key in SiteColorKeys]: string};

export class ColorUtils {
    /** Schema for validating colors map required to set site colors */
    public static siteColorsSchema: Yup.SchemaOf<SiteColorsMap> = Yup.object().shape({
        primaryBgColor: SchemaUtils.rgbColorSchema.required(),
        secondaryBgColor: SchemaUtils.rgbColorSchema.required(),
        primaryTextColor: SchemaUtils.rgbColorSchema.required(),
        secondaryTextColor: SchemaUtils.rgbColorSchema.required(),
    })
}
