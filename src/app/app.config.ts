import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "pass-the-salt-ab2bf", appId: "1:958479223308:web:186ac8b6309f3a93b8fc29", storageBucket: "pass-the-salt-ab2bf.firebasestorage.app", apiKey: "AIzaSyBWsTN23rk1jrx6I7_YWEzaTyqhOkF9fkY", authDomain: "pass-the-salt-ab2bf.firebaseapp.com", messagingSenderId: "958479223308" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
