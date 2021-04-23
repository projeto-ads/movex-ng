import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRestService } from '../core/service/abstract-rest.service';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractRestService<Profile> {

  constructor(http: HttpClient) {
    super(http, 'profile');
  }
}