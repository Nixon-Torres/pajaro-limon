import { Component, OnInit } from '@angular/core';
import {MediaApi} from "../../../shared/sdk/services/custom";
import {LoopBackFilter, Media} from "../../../shared/sdk/models";
import {catchError, map} from "rxjs/operators";
import {of, zip} from "rxjs";
import {AjaxError} from "rxjs/ajax";

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.css']
})
export class InspirationComponent implements OnInit {

  public videoMain: unknown;
  public videoFirst: unknown;
  public videoSecond: unknown;
  constructor(private media: MediaApi) { }

  ngOnInit(): void {
    this.loadVideos();
  }

  private loadVideos() {
    const main$ = this.media.find(this.setFilter('inspiration-main'));
    const first$ = this.media.find(this.setFilter('inspiration-first'));
    const second$ = this.media.find(this.setFilter('inspiration-second'));

    zip(main$, first$, second$)
      .pipe(
        catchError( (err: AjaxError) => {
          return of(['']);
        }),
        map((resp: unknown) => ({main: resp[0][0], first: resp[1][0], second: resp[2][0]})),
      ).subscribe((resp) => {
      this.videoMain = this.videoConfig(resp.main);
      this.videoFirst = this.videoConfig(resp.first);
      this.videoSecond = this.videoConfig(resp.second);
    });
  }

  setFilter(key): LoopBackFilter {
    return {where: {key}};
  }

  private videoConfig(video: Media) {
    return video ? ( {
        autoplay: false,
        controls: true,
        preload: false,
        controlBar: {
          pictureInPictureToggle: false,
        },
        sources: [
          {src: video.url, type: video.type}
        ]
      }) : null;
  }
}
