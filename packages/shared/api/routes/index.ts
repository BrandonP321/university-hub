import { ApiEndoint } from "../endpoints";

/** Returns callback for constructing a url path for an api endpoint, replacing url params if provided */
export function ApiEndpointUrl<TEndoint extends ApiEndoint.Types.Endpoint>(path: string) {
    return (urlParams?: {[key in ApiEndoint.Types.UrlParams<TEndoint>]: string}) => {

        // replace each param (':someParam') in the path with the param values if provided
        if (urlParams) {
            let pKey: keyof typeof urlParams;

            for (pKey in urlParams) {
                const paramRegex = new RegExp(`:${String(pKey)}`, "ig");

                urlParams && (path = path.replace(paramRegex, urlParams[pKey]));
            }
        }
        
        return path;
    }
}

export * from "./user.routes";
export * from "./university.routes";