import { ApiEndpointUrl } from ".";
import { UniversityApiEndpoints } from "../endpoints";

export const UniversityApiRoutes = {
    getUniversityShallow: ApiEndpointUrl<UniversityApiEndpoints.GetUniversityShallow>("/university/:universitySlug/shallow")
} as const;
