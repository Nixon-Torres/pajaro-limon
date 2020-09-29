import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StreamApi} from "../../../shared/sdk/services/custom";
import {GoogleTagManagerService} from 'angular-google-tag-manager';

@Component({
  selector: 'app-home-vino',
  templateUrl: './home-vino.component.html',
  styleUrls: ['./home-vino.component.css']
})
export class HomeVinoComponent implements OnInit {
  public wishList: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private streamApi: StreamApi,
    private gtmService: GoogleTagManagerService,
  ) { }

  ngOnInit(): void {
    this.wishList = false;
  }

}
