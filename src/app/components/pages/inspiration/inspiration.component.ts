import { Component, OnInit } from '@angular/core';
import {MediaApi} from "../../../shared/sdk/services/custom";
import {LoopBackFilter, Media} from "../../../shared/sdk/models";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.css']
})
export class InspirationComponent implements OnInit {

  videoOptions: unknown;
  constructor(private media: MediaApi) { }

  ngOnInit(): void {
    const filter: LoopBackFilter = {
      where: {
        key: 'inspiration-main'
      }
    };
    this.media.find(filter)
      .pipe(
        map(([media]) => media)
      ).subscribe((media: Media) => {
      this.videoOptions = {
        autoplay: true,
        controls: true,
        controlBar: {
          pictureInPictureToggle: false,
        },
        sources: [
          {src: media.url, type: media.type}
        ]
      }
    });

  }


}
