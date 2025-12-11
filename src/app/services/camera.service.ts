import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CameraService {

  async startCamera(videoElement: HTMLVideoElement) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    await videoElement.play();
  }

  captureImage(videoElement: HTMLVideoElement): string {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(videoElement, 0, 0);

    return canvas.toDataURL("image/png");
  }
}
