import { ApiEndoint } from "@university-hub/shared/api/endpoints";
import { RequestHandler } from "express";

export type ApiHandler<TEndpoint extends ApiEndoint.Types.Endpoint> = RequestHandler<
    ApiEndoint.Types.UrlParamsMap<TEndpoint>,
    ApiEndoint.Types.ResBody<TEndpoint>,
    ApiEndoint.Types.ReqBody<TEndpoint>
>;
