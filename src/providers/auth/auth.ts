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

  static readonly CLIENT_ID: string = 'gyye6hC6IqKjUSqnJAvCp7hQz69tk2GOc8kRyXy2';
  static readonly CLIENT_SECRET: string = '6ssT7ComxCfqhOEXoTmZ0Anpx7MSL50LgPGXHKYaHCgWy4KXMOAdkwMZIguCmYq39I5MHm4HOMv3eql1GjOYlnrIrDBubcZoZOVB3VYNeGQeLp6jsDJfBw0bCRc6LqLA';

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
