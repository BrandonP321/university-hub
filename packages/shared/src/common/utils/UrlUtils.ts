type TUrlParam = {
    key: string;
    value: string;
}

class Url {
    private url;

    constructor(url: string) {
        this.url = new URL(url);
    }

    public toString = () => {
        return this.url.toString();
    }
    
    public addParam = (param: TUrlParam) => {
        this.url.searchParams.append(param.key, param.value);

        return this;
    }
    
    public addParams = (...params: TUrlParam[]) => {
        params?.forEach(p => this.addParam(p));

        return this;
    }

    public getParam = (key: string) => {
        return this.url.searchParams.get(key);
    }
}

export class UrlUtils {
    public static url = (url: string) => {
        return new Url(url);
    }

    public static getParam = (url: string, key: string) => {
        return this.url(url).getParam(key);
    }
}

const url = "https://bungie.net";

const testUrl = new URL(url);

const myUrl = UrlUtils.url(url).addParams().toString()