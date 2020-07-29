import { Component } from '@angular/core';
import {LoopBackConfig} from "./shared/sdk";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'colombiamoda-frontend';
  constructor() {
    LoopBackConfig.setBaseURL(environment.URL_API);
  }
}
