import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() hasFinished: boolean = false;
  @Input() minutes: number = 0;
  @Input() seconds: number = 0;

  public minuteLeft: string;
  public minuteRight: string;
  public secondLeft: string;
  public secondRight: string;

  constructor() {}

  ngOnInit(): void {
    [this.minuteLeft, this.minuteRight] = String(this.minutes).padStart(2, '0').split('');
    [this.secondLeft, this.secondRight] = String(this.seconds).padStart(2, '0').split('');
  }

  resetCountdown() {}

  startCountdown() {}
}
