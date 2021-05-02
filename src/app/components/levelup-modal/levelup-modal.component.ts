import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-levelup-modal',
  templateUrl: './levelup-modal.component.html',
  styleUrls: ['./levelup-modal.component.scss'],
})
export class LevelupModalComponent implements OnInit {

  @Input() level: number;

  @Output() closeLevelUpModal: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.closeLevelUpModal.emit();
  }
}
