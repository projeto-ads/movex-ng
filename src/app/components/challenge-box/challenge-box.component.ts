import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Challenge } from 'src/app/model/challenge.model';
import { Profile } from 'src/app/model/profile.model';
import { ChallengeService } from 'src/app/service/challenge.service';

@Component({
  selector: 'app-challenge-box',
  templateUrl: './challenge-box.component.html',
  styleUrls: ['./challenge-box.component.scss'],
})
export class ChallengeBoxComponent implements OnInit {

  @Input() profile: Profile;
  @Input() experienceToNextLevel: number;

  @Output() challengeBtnAction: EventEmitter<void> = new EventEmitter();
  @Output() challengeCompleted: EventEmitter<any> = new EventEmitter();

  public activeChallenge: Challenge;

  public showLevelUpModal: boolean = false;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {

  }

  public startNewChallenge() {
    this.challengeService.findSome().subscribe((challenge: Challenge) => {
      this.activeChallenge = challenge;

      new Audio('/assets/notification.mp3').play();
    });
  }

  public handleChallengeSucceeded() {
    this.completeChallenge();
    this.resetChallengeAndStartCountdown()
  }

  public handleChallengeFailed() {
    this.resetChallengeAndStartCountdown();
  }

  public completeChallenge() {
    if (!this.activeChallenge) {
      return;
    }

    const { amount } = this.activeChallenge;
    let finalExperience = this.profile.currentExperience + amount;

    if (finalExperience >= this.experienceToNextLevel) {
      finalExperience = finalExperience - this.experienceToNextLevel;
      this.levelUpModal();
    }

    this.profile.currentExperience = finalExperience;
    this.profile.challengesCompleted += 1;
    this.challengeCompleted.emit(this.profile);
  }

  public levelUpModal() {
    this.profile.level += 1;
    this.showLevelUpModal = true;
  }

  private resetChallengeAndStartCountdown() {
    this.activeChallenge = null as any;
    this.challengeBtnAction.emit();
  }


  public closeLevelUpModal() {
    this.showLevelUpModal = false;
  }
}
