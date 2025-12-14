import { AfterViewInit, Component, ElementRef, ViewChild,NgZone  } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert_service';

@Component({
  selector: 'app-faceid',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule,NgIf]
})
export class Login implements AfterViewInit {

  @ViewChild('video')
  videoRef!: ElementRef<HTMLVideoElement>;

  loading = false;
  capturedImage: string | null = null;
  errorMessage = '';
  apiUrl = '/api/v1/Auth/recognize';

  constructor(private http: HttpClient, private router: Router,private alert: AlertService,private zone: NgZone) { }

  async ngAfterViewInit() {
    await this.startCamera();
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.videoRef.nativeElement;
      video.srcObject = stream;
      await video.play();
    } catch (e) {
      console.error("Camera error:", e);
    }
  }

  async capture() {
    if (this.loading) return;
    this.loading = true;
    this.errorMessage = '';

    const video = this.videoRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    let imageBlob: Blob;

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageBlob = await new Promise(resolve => canvas.toBlob(resolve as any, 'image/jpeg'));
    } else {
      this.loading = false;
      this.errorMessage = 'Cannot capture image!';
      return;
    }

    // FormData yaratamiz
    const formData = new FormData();
    formData.append('image', imageBlob, 'face.jpg');
    this.http.post<any>(this.apiUrl, formData, { observe: 'response' })
      .subscribe({

        next: (res) => {
          this.loading = false;
          console.log('API javobi:------------------------------------------------------------------------------------', res);
          if (res.status === 200 && res.body?.success) {
            const person = res.body.person;
            localStorage.setItem('person', JSON.stringify(person));
            const capturedImageUrl = URL.createObjectURL(imageBlob);
            localStorage.setItem('capturedImage', capturedImageUrl);
            this.router.navigate(['/success'], {
            });
          } else
            if (res.status === 200 && res.body?.success == false) {
               this.zone.run(() => {
          this.loading = false;
          this.showAlert("Yuz topilmadi! Qayta urinib ko‘ring.");
        });
             } else if (res.status === 400) {
              this.errorMessage = 'Face not recognized! Please try again. 400';
              this.loading = false;
            }
        },
        error: (err) => {
          this.loading = false;
          console.log('------------------------------------------------------------------------------------', err);
          if (err.status === 404) {
            this.errorMessage = 'Face not recognized!';
          } else {
            this.errorMessage = 'Server error!';
          }
        }
      });
  }
   showAlert(message: string) {
    alert(message);
    window.location.reload(); // OK bosilganda reload
  }

}