import { ColorUtils, SiteColorKeys, SiteColorsMap } from "../../common/utils/ColorUtils";

type TSiteColorKeysToCSSVarsMap = {[key in SiteColorKeys]: string};

export class WebColorUtils {
    private static siteColorKeysToCSSVarsMap: TSiteColorKeysToCSSVarsMap = {
        primaryBgColor: "--primary-bg-color",
        secondaryBgColor: "--secondary-bg-color",
        primaryTextColor: "--primary-text-color",
        secondaryTextColor: "--secondary-text-color",
    }

    /** 
     * Updates color css variables.
     * @param ele - Element to apply new CSS variable colors to
     */
    private static updateCssVars(colors: SiteColorsMap, ele: HTMLElement) {
        let colorKey: keyof typeof colors;
        for (colorKey in colors) {
            const color = colors[colorKey];
            const cssVar = this.siteColorKeysToCSSVarsMap[colorKey];

            ele.style.setProperty(cssVar, color);
        }
    }

    /** 
     * Updates site colors IF AND ONLY IF ALL colors passed in are valid rgb(r, g, b) strings.
     * @param ele - Element to apply new CSS variable colors to.  Defaults to `<body>` if no ele present
     */
    public static setSiteColors(colors: SiteColorsMap, ele?: HTMLElement) {
        ColorUtils.siteColorsSchema.isValid(colors).then((isValid) => {
            isValid && this.updateCssVars(colors, ele ?? document.body);
        })
    }
}