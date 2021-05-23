import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  alertTypeClass = {
    [AlertType.Success]: 'alert alert-success alert-dismissable',
    [AlertType.Error]: 'alert alert-danger alert-dismissable',
    [AlertType.Info]: 'alert alert-info alert-dismissable',
    [AlertType.Warning]: 'alert alert-warning alert-dismissable'
  };

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.message) {
          this.alerts = this.alerts.filter(obj => obj.keepAfterRouteChange);
          this.alerts.forEach(obj => delete obj.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      let alertFade = this.alerts.find(obj => obj === alert) || new Alert();
      alertFade.fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(obj => obj !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(obj => obj !== alert);
    }
  }

  cssClass(alert: Alert) {
    let classes = this.alertTypeClass[alert.type];

    if (alert.fade) {
      classes += ' fade';
    }

    classes += ' show';

    return classes;
  }
}