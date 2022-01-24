import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BeerService} from "./shared/services/beer.service";
import {BeerInterface} from "./shared/interfaces/beer.interface";
import {fromEvent} from "rxjs";
import {catchError, debounceTime, mergeMap, pluck, takeUntil} from "rxjs/operators";
import {of} from "rxjs";
import {DestroyUnsubscribe} from "./provides/extends/destroy-unsubscribe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends DestroyUnsubscribe implements OnInit {

  /** list of beers fetched from backend by API */
  public beerList: BeerInterface[] = [];

  /** temporary list of found beers */
  public tempFilterArr: BeerInterface[] = [];

  /** list of requests in search bar */
  public recentSearchArr: any[] = [];

  /** delay before stop typing and start searching */
  public DEB_TIME: number = 1000;

  /** max size of search request list */
  public MAX_SEARCH_RESULTS: number = 4;

  /** list of search requests for storing in local storage */
  public storageArr: string[] = [];

  /** current showed page (first, by default) */
  public currentBeerPage: number = 1;

  /** list of result amounts per page */
  public amountBeers: any[] = [
    {name: '10', value: 10},
    {name: '30', value: 30},
    {name: '50', value: 50},
    {name: '100', value: 100},
  ];

  /** amount of results per page, 10 - by default */
  public resultsPerPage = 10;

  /** array of pages. Since API doesn't return total amount of pages or beer records,
   * I don't know exact amount of pages, so I decided let it be 10. But you can go further with "next" button */
  public range: number[] = Array.from({length: 10}, (_, i) => i + 1);

  /** input element from the template */
  @ViewChild('inp', {static: true}) name: ElementRef;

  /** div element for list of beers from the template */
  @ViewChild('beersList', {static: true}) beerListElement: ElementRef;

  /** 'id' of clicked beer element */
  public clickedBeer: number;

  constructor(
    private beerService: BeerService
  ) {
      super();
  }

  /**
   * subscribes for user input and gets beers from backend by API
   */
  ngOnInit(): void {
    this.beerService.getBeers(this.currentBeerPage, this.resultsPerPage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        res.forEach((el: any) => {
          let beerObj = this.beerParse(el);
          this.beerList.push(beerObj);
        });
      }, (error) => {
        console.log(error.error.message);
      });

    fromEvent(this.name.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        pluck('target', 'value'),
        debounceTime(this.DEB_TIME),
        mergeMap((name: any) => {
          if (this.recentSearchArr && this.recentSearchArr.length > this.MAX_SEARCH_RESULTS) {
            this.recentSearchArr.shift();
          }
          if (name) {
            this.recentSearchArr.push(name);
          }
          localStorage.setItem('search', JSON.stringify(this.recentSearchArr));
          return this.beerService.getBeers(this.currentBeerPage, this.resultsPerPage, name)
        }),
        catchError(er => of(er))
      )
      .subscribe((res: any) => {
        this.currentBeerPage = 1;
        this.clickedBeer = -1;
        this.tempFilterArr = [];
        res.forEach((el: any) => {
          let beerObj = this.beerParse(el);
          this.tempFilterArr.push(beerObj);
        });
        this.beerList = this.tempFilterArr;
      });

  }

  /**
   * gets search requests from local storage
   */
  public getStorage(): void | string {
    if (localStorage.getItem('search')) {
      // @ts-ignore
      let tempStr = localStorage.getItem('search').substring(1, localStorage.getItem('search').length - 1);
      let storageArr1 = tempStr.split(',');
      this.storageArr = storageArr1.map(el => {
        return el.substring(1, el.length - 1);
      });
    }
  }

  /**
   * gets beers from precise page
   * @param page - page number
   */
  public getBeersFromPage(page: number): void {
    this.name.nativeElement.value = '';
    this.clickedBeer = -1;
    this.currentBeerPage = page;
    if (this.beerListElement) {
      this.beerListElement.nativeElement.scrollTop = 0;
    }
    this.beerService.getBeers(page, this.resultsPerPage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.beerList = [];
        res.forEach((el: any) => {
          let beerObj = this.beerParse(el);
          this.beerList.push(beerObj);
        });
      }, (error) => {
        console.log(error.error.message);
      });
  }

  /**
   * changes current beer page
   * @param directionUp - direction flag: true - for increasing page number, false - for decreasing
   */
  public changeBeerPage(directionUp: boolean): void {
    if (directionUp) {
      this.currentBeerPage++;
      this.getBeersFromPage(this.currentBeerPage);
    } else {
      if (this.currentBeerPage > 1) {
        this.currentBeerPage--;
        this.getBeersFromPage(this.currentBeerPage);
      } else {
        return;
      }
    }
  }

  /**
   * Parses beer element fetched by API and returns object of BeerInterface
   * @param el - initial beer element
   */
  private beerParse(el: any): BeerInterface {
    return {
      beer_name: el.name,
      image_url: el.image_url,
      tagline: el.tagline,
      beer_description: el.description
    };
  }

  /**
   * changes amount of fetched results per page
   * @param event
   */
  public onChange(event: any): void {
    this.resultsPerPage = event.target.value;
    this.getBeersFromPage(1);
  }

  /**
   * assigns index of clicked beer element to variable for beer-item component
   * @param i - element index
   */
  public getIndex(i: number): void {
    this.clickedBeer = this.clickedBeer !== i ? i : -1;
  }
}
