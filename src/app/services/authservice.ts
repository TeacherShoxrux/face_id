import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Face ID orqali ro‘yxatdan o‘tish
  async registerWithFaceID() {
    try {
      const publicKey: PublicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from("random_challenge_123", c => c.charCodeAt(0)),
        rp: { name: "My Angular App" },
        user: {
          id: Uint8Array.from("user123", c => c.charCodeAt(0)),
          name: "user@example.com",
          displayName: "User"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
        authenticatorSelection: {
          authenticatorAttachment: "platform",   // Face ID ishlatadi
          userVerification: "required"
        },
        timeout: 60000,
        attestation: "direct"
      };

      const credential = await navigator.credentials.create({ publicKey });
      console.log("REGISTER SUCCESS:", credential);

      return credential;

    } catch (err) {
      console.error("REGISTER ERROR:", err);
      return null;
    }
  }


  // Face ID orqali login bo‘lish
  async loginWithFaceID() {
    try {
      const publicKey: PublicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from("login_challenge", c => c.charCodeAt(0)),
        timeout: 60000,
        userVerification: "required",
      };

      const credential = await navigator.credentials.get({ publicKey });
      console.log("LOGIN SUCCESS:", credential);

      return credential;

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      return null;
    }
  }
}
