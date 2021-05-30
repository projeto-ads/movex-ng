import { Component, OnInit, ViewChild } from '@angular/core';
import { ChallengeBoxComponent } from 'src/app/components/challenge-box/challenge-box.component';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { ExperienceBarComponent } from 'src/app/components/experience-bar/experience-bar.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('challengeBox', { read: ChallengeBoxComponent })
  private challengeBoxComponent: ChallengeBoxComponent;

  @ViewChild('countdown', { read: CountdownComponent })
  private countdownComponent: CountdownComponent;

  @ViewChild('experienceBar', { read: ExperienceBarComponent })
  private experienceBarComponent: ExperienceBarComponent;

  public experienceToNextLevel: number = 0;

  public isCountdownActive: boolean = false;
  public hasCountdownFinished: boolean = false;

  constructor(
    private profileService: ProfileService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }


  public getProfileInfo() {
    this.profileService.getProfileInfoById(this.authService.profileInfo.id)
      .subscribe(profile => {
        this.authService.profileInfo = profile;
        this.authService.profileInfo.imageUrl = profile.imageUrl + '?' + performance.now()
        this.experienceToNextLevel = Math.pow(((profile.level + 1) * 3), 2);
      });

  }

  public startChallenge() {
    this.challengeBoxComponent.startNewChallenge();
  }

  public challengeBtnAction() {
    this.countdownComponent.resetCountdown();
  }

  public challengeCompleted(profile: Profile) {
    this.authService.profileInfo = profile;
    this.experienceToNextLevel = Math.pow(((profile.level + 1) * 3), 2);
    this.experienceBarComponent.currentExperience = profile.currentExperience;
    this.experienceBarComponent.calcPercentToNextLevel();

    this.profileService.updateChallengeInfo(profile)
      .subscribe();
  }

}
