import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import videojs from 'video.js';
import {Observable} from "rxjs";
import {GoogleTagManagerService} from 'angular-google-tag-manager';

@Component({
  selector: 'app-vjs-player',
  template: `
    <video #target class="video-js" controls muted playsinline preload="none"></video>
  `,
  styleUrls: ['./vjs-player.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  @Output() ready = new EventEmitter();
  @Output() videoInfo = new EventEmitter();
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };
  player: videojs.Player;
  @Input() public gtm: any;

  constructor(
    private gtmService: GoogleTagManagerService
  ) { }

  ngOnInit() {
    // instantiate Video.js
    const global = this;
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      global.pushDataLayers(global);
      const playTime$ = new Observable<number>(subscriber => {
        this.on('timeupdate', function () {
          subscriber.next(this.getCache().currentTime);
        })
        this.on('pause', function() {
          subscriber.next(this.getCache().currentTime);
        })
        this.on('pause', function () {
          subscriber.next(this.getCache().currentTime);
        })
      });
      global.videoInfo.emit(playTime$);
      global.ready.emit({action: 'ready', cache: this.getCache()});
    });
  }

  private pushDataLayers(global) {
    if (global.gtm) {
      if (global.gtm['event'] === 'eventPlay') {
        global.gtmService.pushTag(global.gtm);
      }
    }
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

}
