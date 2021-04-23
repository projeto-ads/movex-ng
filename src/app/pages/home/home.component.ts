import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/model/challenge.model';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public profile: Profile = new Profile();
  public activeChallenge: Challenge;

  public minutes: number = 25;
  public seconds: number = 0;
  public experienceToNextLevel: number = 0;

  public isCountdownActive: boolean = false;
  public hasCountdownFinished: boolean = false;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  public getProfileInfo() {
    this.profileService.getOne(1)
      .subscribe(profile => {
        this.profile = profile;
        this.experienceToNextLevel = Math.pow(((this.profile.level + 1) * 4), 2)
      });
  }

}
