import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../core/service/abstract-rest.service';
import { Challenge } from '../model/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends AbstractRestService<Challenge> {

  constructor(http: HttpClient) {
    super(http, 'challenge');
  }
}
