Untuk melihat cara kerja project ini, silakan klik URL berikut:  
[Dokumentasi](https://dupancode.com/dmtrackgo)

- **Versi**: 1.0.0
- **Terakhir Diperbarui**: 25 Juni 2025

Berikut adalah langkah-langkah instalasi proyek pada lokal berdasarkan instruksi yang diberikan:

1. **Pastikan Node.js Terinstal**  
   - Periksa apakah Node.js sudah terinstal di komputer Anda dengan menjalankan perintah berikut di terminal:  
     ```bash
     node -v
     ```  
     Jika belum terinstal, unduh dan instal Node.js dari situs resmi: [nodejs.org](https://nodejs.org).

2. **Clone atau Siapkan Proyek**  
   - Clone proyek ke lokal Anda dengan perintah:  
     ```bash
     git clone https://github.com/dupancode/dmtrackgo.git
     ```  
   - Atau download file Zip.

3. **Masuk ke Direktori Proyek**  
   - Buka terminal dan navigasikan ke direktori proyek menggunakan perintah:  
     ```bash
     cd dmtrackgo
     ```

4. **Konfigurasi API Key di `courierList.js`**  
   - Buka file `courierList.js` yang terletak di folder `controller` menggunakan editor teks (misalnya VS Code).  
   - Masukkan API key Binderbyte Anda pada bagian yang sesuai, misalnya:  
     ```javascript
     const API_KEY = 'YOUR_BINDERBYTE_API_KEY';
     ```  
   - Simpan perubahan pada file.

5. **Jalankan Proyek**  
   - Di terminal, pastikan Anda berada di direktori proyek, lalu jalankan perintah berikut:  
     ```bash
     node server.js
     ```  
   - Server akan berjalan, dan Anda dapat mengakses aplikasi sesuai konfigurasi (misalnya, melalui `http://localhost:3000` atau port lain yang ditentukan).

**Catatan Tambahan**:
- Pastikan Anda memiliki API key valid dari Binderbyte. Daftar atau login ke [Binderbyte](https://binderbyte.com) untuk mendapatkannya.
- Jika terjadi error, periksa apakah semua dependensi terinstal dengan benar atau cek log error di terminal untuk detailnya.
- Pastikan port yang digunakan oleh `server.js` tidak sedang digunakan oleh aplikasi lain.

