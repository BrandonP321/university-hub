import { UniversityApiEndpoints } from "@university-hub/shared/api/endpoints";
import { ApiHandler } from ".";

export const GetUniversityShallowController: ApiHandler<UniversityApiEndpoints.GetUniversityShallow> = (req, res) => {
    res.json({
        siteColors: {
            primaryBgColor: "rgb(23, 24, 30)",
            secondaryBgColor: "rgb(255, 255, 255)",
            primaryTextColor: "rgb(255, 255, 255)",
            secondaryTextColor: "rgb(0, 0, 0)",
            },
        logoUrl: "some.url"
    }).end();
}