# Fitur Generate Soal dengan AI

## Deskripsi
Fitur ini memungkinkan admin untuk membuat soal pilihan ganda secara otomatis menggunakan AI (Gemini). Admin dapat menggenerate soal berdasarkan:
1. Materi yang sudah ada di database
2. File PDF yang di-upload (belum diimplementasi)

## Cara Menggunakan

### 1. Akses Halaman
- Login sebagai admin
- Buka menu **Kelola Soal**
- Klik tombol **"Generate Soal dengan AI"**

### 2. Isi Form
- **Jumlah Soal**: Masukkan jumlah soal yang ingin dibuat (1-20)
- **Pilih Latihan**: Pilih latihan target dimana soal akan disimpan
- **Sumber Konteks**: Pilih "Dari Materi" atau "Upload PDF"
  - Jika "Dari Materi": Pilih materi yang sudah ada
  - Jika "Upload PDF": Upload file PDF (fitur ini akan dikembangkan nanti)

### 3. Generate & Preview
- Klik tombol **"Generate Soal dengan AI"**
- Tunggu AI memproses (biasanya 10-30 detik)
- Preview soal akan muncul di panel kanan dengan:
  - Teks pertanyaan
  - 4 pilihan jawaban (A, B, C, D)
  - Indikator jawaban benar (ditandai warna hijau)

### 4. Simpan Soal
- Review semua soal yang di-generate
- Klik tombol **"Simpan Semua Soal"**
- Soal akan tersimpan ke database dan terhubung dengan latihan yang dipilih
- Jumlah total pertanyaan di latihan akan ter-update otomatis

## Struktur Data Soal

Setiap soal memiliki format:
```json
{
  "teks_pertanyaan": "Apa ibu kota Indonesia?",
  "pilihan": {
    "a": "Jakarta",
    "b": "Bandung",
    "c": "Surabaya",
    "d": "Medan"
  },
  "jawaban_benar": "a"
}
```

## API Endpoints

### Generate Soal
- **URL**: `/api/admin/generate-soal`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**:
  - `jumlahSoal`: number (1-20)
  - `sumberKonteks`: "materi" | "pdf"
  - `idLatihan`: string
  - `idMateri`: string (jika sumberKonteks = "materi")
  - `file`: File (jika sumberKonteks = "pdf")

### Simpan Soal
- **URL**: `/api/admin/soal`
- **Method**: POST
- **Content-Type**: application/json
- **Body**:
  ```json
  {
    "questions": [
      {
        "teks_pertanyaan": "...",
        "pilihan": { "a": "...", "b": "...", "c": "...", "d": "..." },
        "jawaban_benar": "a",
        "id_latihan": "1"
      }
    ]
  }
  ```

### Daftar Latihan
- **URL**: `/api/admin/latihan`
- **Method**: GET
- **Response**: Daftar semua latihan aktif

## Teknologi
- **AI Model**: Google Gemini (gemini-2.0-flash-exp)
- **PDF Parser**: pdf-parse (untuk fitur mendatang)
- **Database**: MySQL via Prisma
- **Frontend**: Next.js 16 + React 19

## Catatan Pengembangan
- Fitur upload PDF akan diimplementasikan di iterasi berikutnya
- Prompt AI sudah dioptimalkan untuk soal tingkat SD
- Validasi jumlah soal maksimal 20 untuk menghindari timeout
- Error handling sudah terimplementasi untuk berbagai kasus edge

## File Terkait
- `/app/admin/soal/tambah/page.tsx` - Halaman utama
- `/app/admin/soal/tambah/components/form.tsx` - Form input
- `/app/admin/soal/tambah/components/preview.tsx` - Preview soal
- `/app/api/admin/generate-soal/route.ts` - API generate
- `/app/api/admin/soal/route.ts` - API simpan soal
- `/app/api/admin/latihan/route.ts` - API daftar latihan
