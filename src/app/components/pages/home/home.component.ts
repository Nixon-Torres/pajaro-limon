import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { interval, Observable} from "rxjs";
import { map, takeWhile, throttleTime} from "rxjs/operators";
import { StreamApi} from "../../../shared/sdk/services/custom";
import {Collection, LoopBackFilter, Stream} from "../../../shared/sdk/models";

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
    this.sizes = ['xs', 's', 'm', 'l', 'xl'];
    this.colors = ['blanco', 'negro', 'azul', 'café', 'amarillo', 'blanco2'];
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
    });
  }

  public videoReady(event) {
    this.isPlaying();
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
            include: 'banner',
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
      const startDate = new Date(this.stream.startDate).getTime()
      this.setIsStreaming(startDate, this.currentDate);
      this.collections = this.stream.collections;
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
    const playingDate = new Date().getTime();
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

  public openDetail(id): void {
    this.detail = true;
    this.added = false;
    this.id = id;
  }

  addProduct() {
    this.form.reset();
    this.detail = false;
    this.added = true;
  }
}
