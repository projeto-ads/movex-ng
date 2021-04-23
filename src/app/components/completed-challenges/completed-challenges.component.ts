import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-challenges',
  templateUrl: './completed-challenges.component.html',
  styleUrls: ['./completed-challenges.component.scss'],
})
export class CompletedChallengesComponent implements OnInit {
  @Input() challengesCompleted: number;

  constructor() {}

  ngOnInit(): void {}
}
