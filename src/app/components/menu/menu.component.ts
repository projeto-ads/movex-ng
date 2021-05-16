import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  showProfileInfo: boolean = false;
  name: string;
  imageUrl: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfileInfoById(1)
      .subscribe(profile => {
        if (profile) {
          this.name = profile.name.split(' ').slice(0, -1).join(' ');
          this.imageUrl = profile.imageUrl;
        }
      })
  }

  onClickMenu() {
    let sidebar = this.document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("active");
    }

    this.showProfileInfo = !this.showProfileInfo;
  }
}
