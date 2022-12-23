type TUrlParam = {
    key: string;
    value: string;
}

class Url {
    private url;

    public get hash() { return this.url.hash };
    public get host() { return this.url.host };
    public get params() { return this.url.searchParams };
    public get path() { return this.url.pathname };
    public get port() { return this.url.port };
    public get protocol() { return this.url.protocol };
    public get origin() { return this.url.origin };

    constructor(url: string) {
        this.url = new URL(url);
    }

    public toString = () => {
        return this.url.toString();
    }
    
    public addParam = (param: TUrlParam) => {
        this.params.append(param.key, param.value);

        return this;
    }
    
    public addParams = (...params: TUrlParam[]) => {
        params?.forEach(p => this.addParam(p));

        return this;
    }

    public getParam = (key: string) => {
        return this.params.get(key);
    }
}

export class UrlUtils {
    public static url = (url: string) => {
        return new Url(url);
    }

    public static getParam = (url: string, key: string) => {
        return this.url(url).getParam(key);
    }

    public static addParams = (url: string, ...params: TUrlParam[]) => {
        return this.url(url).addParams(...params).toString();
    }
}
