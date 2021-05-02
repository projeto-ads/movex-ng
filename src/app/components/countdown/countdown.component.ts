import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;
  @Input() hasFinished: boolean = false;

  @Output() startChallenge: EventEmitter<void> = new EventEmitter();

  public initialMinutes: number = 0;
  public initialSeconds: number = 10;

  public minutes: number = this.initialMinutes;
  public seconds: number = this.initialSeconds;

  public startAt: number = 10; // in seconds - 1500

  public minuteLeft: string;
  public minuteRight: string;
  public secondLeft: string;
  public secondRight: string;

  private countdownSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.updateMinutesAndSeconds();
  }

  ngOnDestroy() {
    this.countdownSubscription.unsubscribe();
  }

  public resetCountdown() {
    this.resetMinutesAndSeconds();
    this.isActive = false;
    this.hasFinished = false;
    this.countdownSubscription.unsubscribe();
    this.updateMinutesAndSeconds();
  }

  startCountdown() {
    this.isActive = true;

    const timer: Observable<number> = interval(1000);

    this.countdownSubscription = timer
      .pipe(
        take(this.startAt),
        map((v: number) => this.startAt - (v + 1))
      )
      .subscribe(
        (v: number) => this.formatSecondsAndUpdateDOM(v),
        (err) => console.log(err),
        () => {
          this.hasFinished = true;
          this.isActive = false;

          this.countdownSubscription.unsubscribe();
          this.updateMinutesAndSeconds();
          this.startChallenge.emit();
        }
      );
  }

  public updateMinutesAndSeconds() {
    [this.minuteLeft, this.minuteRight] = String(this.minutes)
      .padStart(2, '0')
      .split('');
    [this.secondLeft, this.secondRight] = String(this.seconds)
      .padStart(2, '0')
      .split('');
  }

  private formatSecondsAndUpdateDOM(value: number) {
    this.minutes = Math.floor(value / 60);
    this.seconds = value % 60;
    this.updateMinutesAndSeconds();
  }

  private resetMinutesAndSeconds() {
    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;
  }

}
