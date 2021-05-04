import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-bar',
  templateUrl: './experience-bar.component.html',
  styleUrls: ['./experience-bar.component.scss'],
})
export class ExperienceBarComponent implements OnInit {

  @Input() currentExperience: number;
  @Input() experienceToNextLevel: number;

  public percentToNextLevel: number;

  constructor() {}

  ngOnInit() {
    this.calcPercentToNextLevel();
  }

  public calcPercentToNextLevel() {
    this.percentToNextLevel =
    this.currentExperience >= 0
      ? Math.round(this.currentExperience * 100) / this.experienceToNextLevel
      : 0;
  }
}
