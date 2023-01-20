import { ApiEndoint } from ".";
import { SiteColorsMap } from "../../common/utils";

export namespace UniversityApiEndpoints {

    export type GetUniversityShallow = ApiEndoint.Types.Endpoint<{
        UrlParams: "universitySlug";
        ReqBody: {};
        ResBody: {
            siteColors: SiteColorsMap;
            logoUrl: string;
        }
    }>
    
}