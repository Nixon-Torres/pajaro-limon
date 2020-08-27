import { Component, OnInit } from '@angular/core';
import {GoogleTagManagerService} from 'angular-google-tag-manager';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private gtmService: GoogleTagManagerService
  ) { }

  ngOnInit(): void {
  }

  tagGoogle(category: any) {
    const gtmTag = {
      eventCategory: category,
      eventAction: 'click',
      eventLabel: category,
      eventValue: '',
      event: 'eventClick',
    };
    this.gtmService.pushTag(gtmTag);
  }

}
