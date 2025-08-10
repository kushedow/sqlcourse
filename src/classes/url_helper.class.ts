export class URLHelper {

    getStep(){
       return parseInt(window.location.hash.split("_").slice(-1)[0])
    }

    hasUserInfo(){

        const params = this.getQueryParams();
        if (params.auth && params.hash) {
            return true
        }
        return false
    }

    getQueryParams() {
        const params = {};
        const urlObj = new URL(window.location.toString());
        const searchParams = new URLSearchParams(urlObj.search);

        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }

        return params;
    }

    hideParamsAndReload() {

        window.location.href = window.location.pathname;

    }
}