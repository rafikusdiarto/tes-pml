# Workflow Penggunaan Agentic AI (Gemini)

Dokumen ini menjelaskan sejauh mana dan bagaimana *Agentic AI* (Gemini) digunakan dalam proses penyelesaian *Take-Home Test* ini. AI digunakan sebagai *pair programmer* untuk mempercepat penulisan kode (*boilerplate*) dan menyelesaikan hambatan teknis secara efisien, sementara arsitektur, keputusan logis, dan desain disetir sepenuhnya oleh kandidat.

## 1. Tahap Inisiasi & Arsitektur
- **Scaffolding Proyek:** AI diminta untuk memberikan langkah-langkah *best practice* dalam menginisialisasi Vite React (TypeScript) dan *backend* Go, agar struktur folder sejak awal sudah rapi.
- **Konfigurasi Tema & Desain:** Saya memberikan arahan desain (*dark mode*, modern, dan *color palette* `#00ae97`) dan menginstruksikan AI untuk menuliskan konfigurasi Tailwind CSS v4 berdasarkan arahan tersebut.

## 2. Tahap Development (React + Tailwind)
- **Pembuatan UI Statis:** Saya mengarahkan AI untuk membuatkan struktur folder komponen fungsional React.
- **Penyelesaian Masalah (Debugging):** 
  - Saat menggunakan `react-leaflet`, AI membantu memberikan solusi untuk memakai OpenStreetMap, lalu menerapkan efek CSS `filter: invert` agar nuansa *dark mode* tetap terjaga.

## 3. Tahap Backend Development (Go + Gin)
- **Menambahkan File Build FE di Folder BE:** Saya menginstruksikan AI untuk menambahkan *logic* pada router agar bisa akses file hasil build FE dan bisa running menggunakan 1 *command* dari BE.

## 4. Tahap Integrasi & Refinement
- **Unified Deployment:** Saya memiliki ide untuk menjalankan FE dan BE dalam 1 *command* (*build & serve*). AI mengeksekusi ide ini dengan cara membungkus hasil *build* Vite ke dalam _static routes_ Gin Web Server dan mengonfigurasi *proxy* di sisi Vite.

## Kesimpulan
Penggunaan Agentic AI pada tes ini terfokus pada perannya sebagai asisten pengetikan cepat, penganalisis *error log*, dan penyuplai dokumentasi pustaka (*library*). Seluruh inisiatif fitur (seperti implementasi penyatuan *port* FE/BE, dan penyusunan struktur folder) berasal dari ide mandiri saya yang kemudian diwujudkan melalui *prompting* yang terarah.