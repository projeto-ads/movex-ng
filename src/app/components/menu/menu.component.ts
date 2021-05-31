import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  showProfileInfo: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private profileService: ProfileService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  onClickMenu() {
    let sidebar = this.document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("active");
    }

    this.showProfileInfo = !this.showProfileInfo;
  }
}
