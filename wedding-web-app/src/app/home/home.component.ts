import { Component } from '@angular/core';
import { Observable, timer, from } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Duration } from 'moment';
const moment = require('moment');

const weddingDate = new Date(2020, 7, 22, 15, 0); //22-Aug-2020 3:00PM

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  timeLeft$: Observable<TimeLeft>;
  timeLeft: TimeLeft;

  constructor() {

    this.timeLeft = this.getTimeLeftFromWeddingTillNow();
    console.log(this.timeLeft);

    this.timeLeft$ = timer(0, 1000).pipe(
      map(() => this.timeLeft = this.getTimeLeftFromWeddingTillNow())
    );

    this.timeLeft$.subscribe();
  }

  getTimeLeftFromWeddingTillNow(): TimeLeft {
    const weddingMoment = moment(weddingDate);

    const duration = moment.duration(weddingMoment.diff(moment()));

    const timeLeft = new TimeLeft();
    timeLeft.years = duration.years();
    timeLeft.months = duration.months();
    timeLeft.days = duration.days();
    timeLeft.hours = duration.hours();
    timeLeft.minutes = duration.minutes();
    timeLeft.seconds = duration.seconds();
    console.log('run');
    return timeLeft;
  }
}

export class TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor() { }
}
