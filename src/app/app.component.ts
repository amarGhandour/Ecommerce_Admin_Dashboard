import {Component, OnInit} from '@angular/core';
import {LoadingService} from "@services/loading.service";
import {delay} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  loading: boolean = false;

  constructor(
    private _loading: LoadingService
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        console.log(loading)
        this.loading = loading;
      });
  }
}
