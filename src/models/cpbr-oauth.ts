import { OAuthProvider, IOAuthOptions } from "ng2-cordova-oauth/provider";

/*
 * Configuration options for using CP oauth
 * @deprecated
 */
export interface ICPOptions extends IOAuthOptions {
}

export class CPOauth extends OAuthProvider {

    options: ICPOptions;
    protected authUrl: string = 'https://sandboxaccounts.campuse.ro/o/authorize';
    protected defaults: Object = {
        clientId: 'zJg7ciZGVjpnFVXtpsdJNeXDJjIemkVVoZdXULOx',
        responseType: 'code',
    };

    constructor(options: ICPOptions = {}) {
        super(options);
    }

}