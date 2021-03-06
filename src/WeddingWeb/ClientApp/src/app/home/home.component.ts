import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { BaseComponent } from '../framework/components/base.component';

const weddingDate = new Date(2020, 7, 22, 15, 0); // 22-Aug-2020 3:00PM

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  timeLeft$: Observable<TimeLeft>;
  timeLeft: TimeLeft;

  constructor() {
    super();
    this.timeLeft = this.getTimeLeftFromWeddingTillNow();

    this.timeLeft$ = timer(0, 1000).pipe(
      map(() => this.timeLeft = this.getTimeLeftFromWeddingTillNow())
    );

    this.timeLeft$.subscribe();
  }

  getTimeLeftFromWeddingTillNow(): TimeLeft {
    const weddingMoment = moment(weddingDate);

    const duration = moment.duration(weddingMoment.diff(moment()));
    const timeLeft = new TimeLeft();
    timeLeft.days = Math.floor(duration.asDays());
    timeLeft.hours = duration.hours();
    timeLeft.minutes = duration.minutes();
    timeLeft.seconds = duration.seconds();
    return timeLeft;
  }
}

export class TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor() { }
}
