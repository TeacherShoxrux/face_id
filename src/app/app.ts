import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalAlert } from "./global-alert/global-alert";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalAlert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('face_app');
}
