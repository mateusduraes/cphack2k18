import { Injectable } from '@angular/core';
import { ServerService } from '@pluritech/server-service';
import { Headers, Http } from '@angular/http';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  static readonly CLIENT_ID: string = 'zJg7ciZGVjpnFVXtpsdJNeXDJjIemkVVoZdXULOx';
  static readonly CLIENT_SECRET: string = 'c8KtcxJMRSqEdtU5wHWxJUMGc7T39uJ9uJIzaHnTYtU7jnDU6WTy7ETh7EQTBcndWegDRK8ksmzgupZm3FDy1POrUXoKabPgoh0J6BcxfHER6Wjgx2iHkwhnMhhJI5Vd';

  constructor(
    public serverService: ServerService,
    public http: Http,
  ) {}

  getAccessToken(code: string) {
    const url = `https://${AuthProvider.CLIENT_ID}:${AuthProvider.CLIENT_SECRET}@sandboxaccounts.campuse.ro/o/token/`;
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=​http://localhost/callback​`;
    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, body, { headers }).toPromise();
  }

}
