import { UniversityApiEndpoints } from "@university-hub/shared/api/endpoints";
import { ApiHandler } from ".";

export const GetUniversityShallowController: ApiHandler<UniversityApiEndpoints.GetUniversityShallow> = (req, res) => {
    console.log("hi");
    res.json({
        siteColors: {
            primaryBgColor: "rgb(100, 0, 0)",
            secondaryBgColor: "rgb(0, 0, 0)",
            primaryTextColor: "rgb(0, 0, 0)",
            secondaryTextColor: "rgb(0, 0, 0)",
          },
        logoUrl: "some.url"
    }).end();
}