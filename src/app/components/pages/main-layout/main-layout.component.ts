import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private colorSubs2: Subscription;
  randomColor: string;

  ngOnInit() {
    const colorObs = new Observable(observer => {
      let randomColor = Math.floor(Math.random() * 0xFFFFFF << 0).toString(16);
      setInterval(() => {
        observer.next(randomColor);
        randomColor = Math.floor(Math.random() * 0xFFFFFF << 0).toString(16);
      }, 1000)
    });
    this.colorSubs2 = colorObs.pipe(map((data: string) => {
      return '#' + data;
    })).subscribe(data => {
      this.randomColor = data;
    });
  }
  ngOnDestroy() {
    this.colorSubs2.unsubscribe();
  }
}
