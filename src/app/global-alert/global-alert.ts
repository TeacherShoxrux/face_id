import { Component } from '@angular/core';
import { AlertService } from '../services/alert_service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-alert',
  imports: [CommonModule],
  templateUrl: './global-alert.html',
  styleUrl: './global-alert.css',
})
export class GlobalAlert {
constructor(public alertService: AlertService) {}

  close() {
    this.alertService.closeAlert();
  }
}
