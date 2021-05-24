import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from './components/alert/alert.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ChallengeBoxComponent } from './components/challenge-box/challenge-box.component';
import { CompletedChallengesComponent } from './components/completed-challenges/completed-challenges.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ExperienceBarComponent } from './components/experience-bar/experience-bar.component';
import { LevelupModalComponent } from './components/levelup-modal/levelup-modal.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

import { ChallengeService } from './service/challenge.service';
import { ProfileService } from './service/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RankingComponent,
    ProfileComponent,
    HomeComponent,
    ChallengeBoxComponent,
    CompletedChallengesComponent,
    CountdownComponent,
    ExperienceBarComponent,
    LevelupModalComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    AppRoutingModule,
  ],
  providers: [ChallengeService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
