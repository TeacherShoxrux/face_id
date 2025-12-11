import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';




// @Component({
//   selector: 'app-success',
//   templateUrl: './success.html',
//   styleUrls: ['./success.css']
// })
// export class Success implements OnInit {

//   userName: string = 'User';
//   imageSrc: string | null = null;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Agar FaceIdComponent navigatsiya orqali state yuborgan bo'lsa, uni o'qiymiz
//     const navState: any = history.state || {};
//     if (navState && navState.capturedImage) {
//       this.imageSrc = navState.capturedImage;
//     }

//     // Agar ism yuborilgan bo'lsa
//     if (navState && navState.userName) {
//       this.userName = navState.userName;
//     }
//   }

//   goToDashboard() {
//     // Dashboard yoki bosh sahifaga yo'naltirish
//     this.router.navigate(['/']);
//   }

//   logout() {
//     // Logout loqikasi: tokenni o'chirish va loginga qaytarish
//     // localStorage.removeItem('auth_token');
//     this.router.navigate(['/faceid']);
//   }
// }

@Component({
  selector: 'app-success',
  templateUrl: './success.html',
    styleUrls: ['./success.css'],
  imports: [DecimalPipe],
})
export class Success implements OnInit {
  person: any = null;
  capturedImage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras?.state as any;
   
    this.person = JSON.parse(localStorage.getItem('person') || 'null');
    const imageData = localStorage.getItem('capturedImage'); 
    
    this.capturedImage = imageData || '';
    // localStorage.setItem('capturedImage', '');
    // localStorage.setItem('person', '');

  }
  goBack() {
  this.router.navigate(['/']); // bosh sahifaga qaytadi
}
}
