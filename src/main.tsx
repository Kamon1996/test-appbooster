import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import "./assets/null.css";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQXIXad2k4Vc-wWDEO9KnWaOme3j31txQ",
  authDomain: "test-app-4d1ec.firebaseapp.com",
  projectId: "test-app-4d1ec",
  storageBucket: "test-app-4d1ec.appspot.com",
  messagingSenderId: "728699833480",
  appId: "1:728699833480:web:fb2fd4cb5ca1c0c258633d",
  measurementId: "G-GXJ21C8PZR",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
