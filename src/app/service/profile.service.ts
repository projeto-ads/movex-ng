import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractRestService } from '../core/service/abstract-rest.service';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractRestService {

  constructor(http: HttpClient) {
    super(http, 'profile');
  }

  public getProfileInfoById(id: number): Observable<Profile> {
    return this.get(`/${id}`) as Observable<Profile>;
  }

  public updateProfileInfo(profile: Profile): Observable<void> {
    return this.put(`/${profile.id}`, {
        level: profile.level,
        currentExperience: profile.currentExperience,
        challengesCompleted: profile.challengesCompleted
    }) as Observable<void>
  }

  public register(name: string, email: string, password: string): Observable<void> {
    return this.post('/profile', {
      name,
      email,
      password
    }) as Observable<void>
  }

}