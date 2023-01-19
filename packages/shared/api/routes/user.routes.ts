import { ApiEndpointUrl } from ".";

type TGetUserUrlParams = "userId";

export const UserRoutes = {
    getUserById: ApiEndpointUrl<TGetUserUrlParams>("/user/:userId")
} as const;
