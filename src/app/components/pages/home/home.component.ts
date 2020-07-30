import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fromEvent, interval, Observable, timer} from "rxjs";
import {first, map, takeWhile, throttleTime} from "rxjs/operators";
import {StreamApi} from "../../../shared/sdk/services/custom";
import {Collection, LoopBackFilter, Product, Sku, Stream} from "../../../shared/sdk/models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isStreaming: boolean;
  public detail: boolean;
  public added: boolean;
  public id: string;
  public sizes: string[];
  public colors: string[];
  public form: FormGroup;
  public currentDate: number;
  public interval = 1000;
  public countdown: any;
  public stream: any;
  public videoOptions: any;
  public collections: Collection[];
  public currentCollection: Collection;
  public videoInfo$;
  public products: Product[];
  public currentProduct: Product;
  public wishList: unknown[] | Product[] = ['', '', '', '', ''];
  public startLength = this.wishList.length;
  public wishListCount: number = 0;
  public checkout: string;

  constructor(
    private formBuilder: FormBuilder,
    private streamApi: StreamApi,
  ) {
  }

  ngOnInit(): void {
    this.isStreaming = false;
    this.detail = false;
    this.added = false;
    this.id = '';
    this.initForm();
    this.currentDate = this.getDate();
    this.getStreams();
  }

  public getVideoInfo(event) {
    this.videoInfo$ = event.pipe(
      throttleTime(1000)
    ).subscribe(val => {
      this.currentCollection = this.collections
        .find((collection, index, array) => {
          if (array[index + 1]) {
            return val > collection.startTime && val < array[index + 1].startTime
          }
          return val > collection.startTime;
        });
      this.products = this.currentCollection ?
        this.currentCollection.products
          .map(product => ({...product, description: product.description.split(' ')[0]})) : [];
    });
  }

  public videoReady(event) {
    if (event && this.isStreaming) {
      this.isPlaying();
    }
  }

  private setVideoOptions(video) {
    return {
      autoplay: true,
      controls: true,
      controlBar: {
        pictureInPictureToggle: false,
      },
      sources: [
        {src: video.url, type: video.type}
      ]
    }
  }

  private getStreams() {
    const filter: LoopBackFilter = {
      order: 'startDate ASC',
      include: [
        {
          relation: 'video',
        }, {
          relation: 'collections',
          scope: {
            order: 'startTime ASC',
            include: [
              {
                relation: 'configs',
                scope: {
                  include: {
                    relation: 'product',
                    scope: {
                      include: 'skus'
                    }
                  }
                }
              },
              {
                relation: 'banner'
              }
            ],
          }
        }
      ],
      limit: 1,
    }
    this.streamApi.find(filter)
      .pipe(
        map((stream: Stream[]) => stream[0])
      ).subscribe(stream => {
      this.stream = stream;
      this.videoOptions = this.setVideoOptions(this.stream.video);
      const startDate = new Date(this.stream.startDate).getTime();
      const endDate = new Date(this.stream.endDate).getTime();
      if (this.currentDate < endDate) {
        this.setIsStreaming(startDate, this.currentDate);
        const collections = this.stream.collections;
        this.collections = collections.map(e => {
          if (!e.configs) {
            return [];
          }
          e.products = e.configs.map(j => {
            const product = j.product;
            debugger
            product.positionX = j.positionX;
            product.positionY = j.positionY;
            return product;
          });
        });
      }
    });
  }

  private getDate() {
    return new Date().getTime();
  }

  private setIsStreaming(start, end) {
    this.isStreaming = start < end;
    if (!this.isStreaming) {
      this.setCountdown(start, end)
        .subscribe({
          next: (val) => this.countdown = val,
          error: (err) => console.log(err),
          complete: () => {
            this.isStreaming = true;
          }
        });
    }
  }

  private isPlaying() {
    const endDate = new Date(this.stream.endDate).getTime();
    const playingDate = this.getDate();
    this.setCountdown(endDate, playingDate)
      .subscribe({
        next: (val) => val,
        error: console.log,
        complete: () => {
          this.isStreaming = false;
          this.videoInfo$.unsubscribe();
        }
      });
  }

  private setCountdown(start: number, end: number): Observable<any> {
    const timeDifference = start - end;
    return interval(this.interval)
      .pipe(
        takeWhile((val: number) => (val * this.interval) < timeDifference, true),
        map((val: number) => this.msToHours(timeDifference - (val * this.interval))),
      );
  }

  private msToHours(ms): any {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return {
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    };
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      size: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  public openDetail(product): void {
    this.currentProduct = product;
    this.sizes = this.currentProduct.skus.map((val) => val.size);
    this.colors = this.currentProduct.skus.reduce((acc: string[], curr: Sku): string[] => {
      if (!acc.find((color: string) => curr.color)) {
        acc.push(curr.color);
      }
      return acc;
    }, []);
    this.detail = true;
    this.added = false;
    this.listenForClose();
  }

  public getPosition(product: Product): unknown {
    return {'left': `${product.positionX}%`, 'top': `${product.positionY}%`}
  }

  private listenForClose(): void {
    const closeElement = document.querySelector('.inner__banner');
    fromEvent(closeElement, 'click')
      .pipe(
        first(() => this.detail)
      )
      .subscribe({
        next: val => this.detail = false,
        error: err => console.log,
        complete: () => this.form.reset()
      })
  }

  public addProduct(): void {
    this.addToWishList();
    this.form.reset();
    this.detail = false;
    this.added = true;
    const title$ = timer(2500)
      .subscribe((value) => {
      this.added = false;
    });
  }

  public deleteItem(id) {
    if (this.wishListCount <= this.startLength) {
      // @ts-ignore
      //wishList can be Product[] or unknown[]
      this.wishList.push('');
    }
    this.wishList = this.wishList.filter(item => item !== id);
    this.updateWishListCount();
  }

  private getAddedSku(current: Product): Product {
    const selection = this.form.value
    return {
      ...current,
      skus: current.skus
        .filter(({size, color}) =>
          (size === selection.size && color === selection.color))
    }
  }

  private addToWishList(): void {
    const current = this.getAddedSku(this.currentProduct);
    const index = this.wishList.findIndex((product) => typeof product === 'string');
    if (index !== -1) {
      this.wishList.splice(index, 1, current);
    } else {
      this.wishList.push(current);
    }
    this.updateWishListCount();
  }

  private updateWishListCount() {
    this.wishListCount = this.wishList.filter(val => typeof val !== 'string').length;
    this.checkout = this.getUrl();
  }

  redirectToCheckout () {
    window.open(this.checkout ? this.checkout : 'https://www.exito.com/' , '_blank');
  }

  private getUrl(): string {
    const BASE_URL = 'https://www.exito.com/checkout/cart/add/?';
    const END_URL = 'sc=1&utm_source=webview&utm_medium=referral&utm_campaign=colombiamoda';
    let products = '';
    this.wishList
      .filter((product: Product) => typeof product !== 'string')
      .forEach((product: Product) => {
        products += `sku=${product.skus[0].plu}&qty=1&seller=1&`;
      });
    return BASE_URL+products+END_URL;
  }
}
