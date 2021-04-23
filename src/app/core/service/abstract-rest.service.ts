import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

export abstract class AbstractRestService<T> {
  constructor(protected _http: HttpClient, protected _actionUrl: string) {}

  private _apiUrl: string = environment.apiUrl + '/' + this._actionUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 
       'Accept': 'application/json'})
  };

  getAll(): Observable<Array<T>> {
    return this._http.get(this._apiUrl, this.httpOptions) as Observable<Array<T>>;
  }

  getOne(id: number): Observable<T> {
    return this._http.get(`${this._apiUrl}/${id}`, this.httpOptions) as Observable<T>;
  }
}
