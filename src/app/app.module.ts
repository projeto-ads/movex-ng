import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { HomeComponent } from './pages/home/home.component';
import { ChallengeBoxComponent } from './components/challenge-box/challenge-box.component';
import { CompletedChallengesComponent } from './components/completed-challenges/completed-challenges.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ExperienceBarComponent } from './components/experience-bar/experience-bar.component';
import { LevelupModalComponent } from './components/levelup-modal/levelup-modal.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ChallengeService } from './service/challenge.service';
import { ProfileService } from './service/profile.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RankingComponent,
    AchievementsComponent,
    HomeComponent,
    ChallengeBoxComponent,
    CompletedChallengesComponent,
    CountdownComponent,
    ExperienceBarComponent,
    LevelupModalComponent,
    ProfileComponent
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, NgbModule],
  providers: [ChallengeService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
