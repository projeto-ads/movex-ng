import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-levelup-modal',
  templateUrl: './levelup-modal.component.html',
  styleUrls: ['./levelup-modal.component.scss'],
})
export class LevelupModalComponent implements OnInit {

  @Input() level: number;

  constructor() {}

  ngOnInit(): void {}

  closeLevelUpModal() {}
}
