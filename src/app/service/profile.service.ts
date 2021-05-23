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

  public updateChallengeInfo(profile: Profile): Observable<void> {
    return this.put(`/${profile.id}`, {
        level: profile.level,
        currentExperience: profile.currentExperience,
        challengesCompleted: profile.challengesCompleted
    }) as Observable<void>;
  }

  public updateProfileInfo(idProfile: number, profile: Profile): Observable<void> {
    return this.put(`/${idProfile}`, {
        name: profile.name,
        email: profile.email,
    }) as Observable<void>;
  }

  public uploadProfileImage(idProfile:number, image64Base: string): Observable<any> {
    return this.put(`/upload-image/${idProfile}`, { image64Base }) as Observable<any>;
  }

}