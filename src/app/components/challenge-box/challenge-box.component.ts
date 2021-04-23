import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from 'src/app/model/challenge.model';

@Component({
  selector: 'app-challenge-box',
  templateUrl: './challenge-box.component.html',
  styleUrls: ['./challenge-box.component.scss'],
})
export class ChallengeBoxComponent implements OnInit {
  @Input() activeChallenge: Challenge;

  constructor() {}

  ngOnInit(): void {}

  handleChallengeFailed() {}

  handleChallengeSucceeded() {}
}
