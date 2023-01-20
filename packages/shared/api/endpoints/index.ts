export * from "./HttpStatusCodes";
export { UserApiEndpoints } from "./user.endpoints";
export { UniversityApiEndpoints } from "./university.endpoints";

export namespace ApiEndoint {

    export namespace Types {

        /** Map type containing types related to an API endoint */
        type EndpointMap = {
            UrlParams: string;
            ReqBody: {[key: string]: any};
            ResBody: {[key: string]: any};
        }
        
        /** Ensures that an API endopint map type has all of the required fields */
        export type Endpoint<T extends EndpointMap = EndpointMap> = T
        
        /** Returns type of `url parameters` from API endopint type */
        export type UrlParams<T extends Endpoint> = T["UrlParams"];
        /** Returns Map type of `UrlParams` */
        export type UrlParamsMap<T extends Endpoint> = {[key in T["UrlParams"]]: string};
        /** Returns type of `request body` from API endopint type */
        export type ReqBody<T extends Endpoint> = T["ReqBody"];
        /** Returns type of `response body` from API endopint type */
        export type ResBody<T extends Endpoint> = T["ResBody"];
    }
}
