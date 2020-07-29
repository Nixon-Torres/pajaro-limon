import {Component, OnInit} from '@angular/core';
import {MediaApi} from "../../../shared/sdk/services/custom";
import {LoopBackFilter, Media} from "../../../shared/sdk/models";
import {of, zip} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AjaxError} from "rxjs/ajax";

@Component({
  selector: 'app-room-knowledge',
  templateUrl: './room-knowledge.component.html',
  styleUrls: ['./room-knowledge.component.css']
})

export class RoomKnowledgeComponent implements OnInit {

  public videoMain: unknown;
  public videoFirst: unknown;
  public videoSecond: unknown;
  public videoThird: unknown;

  constructor(private media: MediaApi) {
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  private loadVideos() {
    const main$ = this.media.find(this.setFilter('room-main'));
    const first$ = this.media.find(this.setFilter('room-first'));
    const second$ = this.media.find(this.setFilter('room-second'));
    const third$ = this.media.find(this.setFilter('room-third'));

    zip(main$, first$, second$, third$)
      .pipe(
        catchError( (err: AjaxError) => {
          return of([''])
        }),
        map((resp: unknown) => ({main: resp[0][0], first: resp[1][0], second: resp[2][0], third: resp[3][0]})),
      ).subscribe((resp) => {
      console.log(resp)
      this.videoMain = this.videoConfig(resp.main);
      this.videoFirst = this.videoConfig(resp.first);
      this.videoSecond = this.videoConfig(resp.second);
      this.videoThird = this.videoConfig(resp.third);
      });
  }

  setFilter(key): LoopBackFilter {
    return {where: {key}}
  }

  private videoConfig(video: Media) {
    return {
      autoplay: false,
      controls: true,
      preload: false,
      controlBar: {
        pictureInPictureToggle: false,
      },
      sources: [
        {src: video.url, type: video.type}
      ]
    }
  }

}
