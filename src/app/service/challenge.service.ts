import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractRestService } from '../core/service/abstract-rest.service';
import { Challenge } from '../model/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends AbstractRestService {

  constructor(http: HttpClient) {
    super(http, 'challenge');
  }

  public findSome(): Observable<Challenge> {
    return this.get('') as Observable<Challenge>;
  }

}
