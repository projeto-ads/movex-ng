import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class AbstractRestService {

  private headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient, private _actionUrl: string) {

  }

  get url(): string {
    return environment.apiUrl + '/' + this._actionUrl;
  }

  public get(endpoint: string, params: any = null): Observable<any> {
    return this.http.get(this.prepareUrl(this.url, endpoint, params));
  }

  public getComURLParams(
    endpoint: string,
    params: HttpParams
  ): Observable<any> {
    return this.http.get(this.buildUrl(this.url, endpoint), {
      params: params,
    });
  }

  public post(
    endpoint: string,
    body: any,
    paramByUrl: any = null
  ): Observable<any> {
    return this.http.post(
      this.prepareUrl(this.url, endpoint, paramByUrl),
      JSON.stringify(body),
      { headers: this.headers }
    );
  }

  public delete(
    endpoint: string,
    paramByUrl: any = null,
    body?: any
  ): Observable<any> {
    return this.http.delete(
      this.prepareUrl(this.url, endpoint, paramByUrl),
      {
        params: body,
        headers: this.headers
      });
  }

  public put(
    endpoint: string,
    body: any,
    paramByUrl: any = null
  ): Observable<any> {
    return this.http.put(
      this.prepareUrl(this.url, endpoint, paramByUrl),
      JSON.stringify(body),
      { headers : this.headers }
      
    );
  }

  private buildUrl(url: string, endpoint: string): string {
    const urlEndsWithSlash: boolean = url.charAt(url.length - 1) === '/';
    const endpointStartsWithSlash: boolean = endpoint.charAt(0) === '/';
    if (urlEndsWithSlash && endpointStartsWithSlash) {
      url = this.removeLastCharacter(url);
    }
    return url + endpoint;
  }

  private prepareUrl(
    url: string,
    endpoint: string,
    paramsByUrl: any = null
  ): string {
    const isEndpointNull: boolean =
      endpoint && endpoint.length <= 0 ? true : false;
    endpoint = isEndpointNull ? '' : endpoint;

    const isSlashLastCaracter: boolean = url.slice(-1) === '/';
    if (isEndpointNull && isSlashLastCaracter) {
      url = this.removeLastCharacter(url);
    }
    const haveParams: boolean =
      typeof paramsByUrl === 'boolean' || paramsByUrl != null;
    if (haveParams) {
      let urlParameter = '';
      if (paramsByUrl) {
        if (typeof paramsByUrl === 'object') {
          for (const attr in paramsByUrl) {
            urlParameter += this.prepareParametersByUrl(paramsByUrl[attr]);
          }
        } else {
          urlParameter = this.prepareParametersByUrl(paramsByUrl);
        }
      }
      return url + endpoint + urlParameter;
    } else {
      return url + endpoint;
    }
  }

  private removeLastCharacter(value: string): string {
    return value.substring(0, value.length - 1);
  }

  private prepareParametersByUrl(params: any) {
    const isString: boolean = typeof params === 'string';
    return isString ? '/' + params.replace(/%/g, '%25') : '/' + params;
  }
}
