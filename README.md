# IoT Entity Tracker - Take-Home Test

Sistem pemantauan dan manajemen entitas geografis (IoT Devices, Vehicles, Facilities) secara *real-time*. Aplikasi ini dibangun menggunakan arsitektur *Single Page Application* (SPA) dengan React (Frontend) dan REST API menggunakan Go (Backend).

## 🚀 Fitur Utama
- **Manajemen Data (CRUD):** Tambah, edit, dan hapus entitas beserta informasi koordinatnya.
- **Peta Interaktif:** Visualisasi titik lokasi entitas pada peta berbasis OpenStreetMap.
- **Auto-Refresh:** Peta otomatis memperbarui data koordinat setiap 3 menit.
- **Unified Build:** Frontend dan Backend dapat dijalankan dalam 1 *port* tunggal untuk fase *production*.

## 🛠️ Library & Teknologi yang Digunakan

### Frontend
- **ReactJS & TypeScript:** Memberikan keandalan dalam pembuatan komponen UI yang dinamis serta *type-safety* untuk mencegah *runtime errors*, terutama saat menerima payload JSON dari backend.
- **Vite:** *Build tool* yang sangat cepat dan ringan dibandingkan Create React App.
- **Tailwind CSS v4:** Mempercepat proses *styling* dengan pendekatan *utility-first* tanpa harus berpindah file CSS, sehingga mudah menciptakan desain *dark mode* modern.
- **React-Leaflet:** Digunakan sebagai *map provider* karena *open-source*, sangat mudah diintegrasikan dengan React, dan sepenuhnya gratis menggunakan basemap OpenStreetMap tanpa memerlukan API Key (berbeda dengan Google Maps).
- **Axios:** Mempermudah HTTP requests ke REST API backend.
- **Lucide React:** Library ikon yang konsisten dan ringan.

### Backend
- **Golang:** Bahasa dengan performa tinggi, sangat ideal untuk menangani banyak *request* I/O (seperti tracking perangkat IoT) dengan konsumsi memori yang rendah.
- **Gin Web Framework:** Dipilih karena kecepatan *routing*-nya yang sangat tinggi dan dokumentasi yang sangat baik untuk membangun REST API.
- **GORM:** Object-Relational Mapping (ORM) yang mempercepat interaksi dengan *database*, termasuk fitur *auto-migration*.
- **PostgreSQL:** *Database* relasional yang tangguh dan banyak digunakan di industri. (Sangat berpotensi untuk di-*scale* menggunakan ekstensi PostGIS di masa depan untuk *query* spasial yang kompleks).

## 💻 Cara Menjalankan Program

### Prasyarat
- Node.js & npm terinstal.
- Go (Golang) terinstal.
- PostgreSQL berjalan di sistem lokal Anda.

### 1. Setup Database
1. Buka PostgreSQL dan buat *database* baru dengan nama `db_iot`.
2. Di dalam folder `be-iot`, buat file `.env` dan sesuaikan kredensialnya:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=root
   DB_NAME=db_iot
   DB_PORT=5432
   PORT=8080
   ```
3. Jalankan migrasi *database*:
   ```bash
   cd be-iot
   go run main.go migrate
   ```

### 2. Menjalankan Aplikasi (Mode Development - 2 Terminal)
Gunakan mode ini jika Anda ingin mengubah kode dengan fitur *Hot Reload*.
- **Terminal 1 (Backend):**
  ```bash
  cd be-iot
  go run main.go
  ```
- **Terminal 2 (Frontend):**
  ```bash
  cd fe-iot
  npm install
  npm run dev
  ```
Buka `http://localhost:5173` di *browser*.

### 3. Menjalankan Aplikasi (Mode Production - 1 Command/Port)
Mode ini membungkus hasil *build* React ke dalam *public folder* Gin, sehingga frontend dan backend berjalan di port yang sama (8080).
1. Masuk ke folder frontend dan jalankan *script deploy* (sesuaikan OS):
   ```bash
   cd fe-iot
   npm install
   npm run build
   
   # Untuk pengguna Windows/CMD, copy folder dist ke dalam public backend:
   # rmdir /s /q ..\be-iot\public & mkdir ..\be-iot\public & xcopy dist\* ..\be-iot\public\ /s /e /y
   ```
2. Jalankan server Backend:
   ```bash
   cd be-iot
   go run main.go
   ```
3. Buka `http://localhost:8080` di *browser*.
