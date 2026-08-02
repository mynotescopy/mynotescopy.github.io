import { showModal } from './ui.js';

// Konfigurasi Firebase Anda yang baru (sms-xurel)
const firebaseConfig = {
  apiKey: "AIzaSyC2E6_eCHkk1IUnkCbBzVcUNIDnPkaP-x4",
  authDomain: "notescopy-45003.firebaseapp.com",
  databaseURL: "https://notescopy-45003-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "notescopy-45003",
  storageBucket: "notescopy-45003.firebasestorage.app",
  messagingSenderId: "430725445258",
  appId: "1:430725445258:web:022ea0401e22c66bb69f73",
};

// Inisialisasi Firebase menggunakan metode Compat (agar web tidak rusak)
firebase.initializeApp(firebaseConfig);
export const db = firebase.database(); 
export const auth = firebase.auth();

export function masukSistem() {
    const e = document.getElementById('global-email').value; 
    const p = document.getElementById('global-pass').value;
    
    // Pastikan email dan password tidak kosong
    if (!e || !p) {
        return showModal("Peringatan", "Email dan Password tidak boleh kosong!", "alert");
    }

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => auth.signInWithEmailAndPassword(e, p))
    .then(() => document.getElementById('main-menu-popup').classList.remove('active'))
    .catch((error) => {
        console.error("Error Firebase:", error);
        
        let pesanPeringatan = "Terjadi kesalahan saat mencoba login.";

        // Menerjemahkan kode error Firebase ke bahasa Indonesia
        switch (error.code) {
            case 'auth/user-not-found':
                pesanPeringatan = "Email ini belum terdaftar sebagai Admin.";
                break;
            case 'auth/wrong-password':
                pesanPeringatan = "Sandi yang Anda masukkan salah.";
                break;
            case 'auth/invalid-credential':
                pesanPeringatan = "Email atau Sandi yang dimasukkan tidak cocok.";
                break;
            case 'auth/invalid-email':
                pesanPeringatan = "Format email tidak valid (contoh yang benar: admin@mail.com).";
                break;
            case 'auth/user-disabled':
                pesanPeringatan = "Akun ini telah dinonaktifkan oleh sistem.";
                break;
            case 'auth/network-request-failed':
                pesanPeringatan = "Gagal terhubung ke server. Periksa koneksi internet Anda.";
                break;
            default:
                // Jika ada error lain yang tidak terdaftar di atas, tampilkan pesan aslinya
                pesanPeringatan = error.message; 
        }

        // Tampilkan pesan yang sudah disesuaikan ke layar
        showModal("Gagal Login", pesanPeringatan, "alert"); 
    });
}

export function keluarSistem() { 
    auth.signOut(); 
    document.getElementById('main-menu-popup').classList.remove('active'); 
}
