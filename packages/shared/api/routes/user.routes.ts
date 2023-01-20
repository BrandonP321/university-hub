import { ApiEndpointUrl } from ".";
import { UserApiEndpoints } from "../endpoints";

export const UserApiRoutes = {
    getUserById: ApiEndpointUrl<UserApiEndpoints.GetUser>("/user/:userId")
} as const;
