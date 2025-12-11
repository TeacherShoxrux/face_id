import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertMessage: string | null = null;
  onClose: (() => void) | null = null;

  showAlert(message: string, onClose?: () => void) {
    this.alertMessage = message;
    this.onClose = onClose ?? null;
  }

  closeAlert() {
    this.alertMessage = null;
    if (this.onClose) this.onClose();
  }
}