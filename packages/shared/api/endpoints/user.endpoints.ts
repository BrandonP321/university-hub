import { ApiEndoint } from ".";

export namespace UserApiEndpoints {

    export type GetUser = ApiEndoint.Types.Endpoint<{
        UrlParams: "userId" | "userEmail";
        ReqBody: { bodyParam: boolean };
        ResBody: {}
    }>
    
}