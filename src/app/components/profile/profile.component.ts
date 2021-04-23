import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() name: string;
  @Input() level: number;
  @Input() imageUrl: string;

  constructor() {}

  ngOnInit(): void {}
}
