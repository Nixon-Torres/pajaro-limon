import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isStreaming = true;
    this.detail = false;
    this.added = false;
    this.id = '';
    this.initForm();
    this.sizes = ['xs', 's', 'm', 'l', 'xl'];
    this.colors = ['blanco', 'negro', 'azul', 'café', 'amarillo', 'blanco2'];
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
