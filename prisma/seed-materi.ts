import { GoogleGenAI } from "@google/genai";
import { Prisma } from "@/lib/prisma";

// Topik materi per kelas
const materiTopics = {
  1: [
    { title: "Mengenal Angka 1-10", prompt: "Pengenalan angka 1 sampai 10 untuk anak kelas 1 SD" },
    { title: "Mengenal Huruf A-Z", prompt: "Pengenalan huruf alfabet A sampai Z untuk anak kelas 1 SD" },
    { title: "Mengenal Warna", prompt: "Pengenalan berbagai macam warna untuk anak kelas 1 SD" },
    { title: "Mengenal Bentuk Dasar", prompt: "Pengenalan bentuk-bentuk dasar seperti lingkaran, segitiga, persegi untuk kelas 1 SD" },
    { title: "Mengenal Anggota Tubuh", prompt: "Pengenalan nama-nama anggota tubuh manusia untuk anak kelas 1 SD" },
  ],
  2: [
    { title: "Penjumlahan dan Pengurangan", prompt: "Belajar penjumlahan dan pengurangan bilangan 1-20 untuk kelas 2 SD" },
    { title: "Mengenal Hewan", prompt: "Pengenalan berbagai jenis hewan dan habitatnya untuk kelas 2 SD" },
    { title: "Suku Kata dan Kata", prompt: "Belajar membaca suku kata dan membentuk kata untuk kelas 2 SD" },
    { title: "Mengenal Waktu", prompt: "Belajar membaca jam dan mengenal konsep waktu untuk kelas 2 SD" },
    { title: "Tumbuhan di Sekitar Kita", prompt: "Pengenalan jenis-jenis tumbuhan dan bagian-bagiannya untuk kelas 2 SD" },
  ],
  3: [
    { title: "Perkalian Dasar", prompt: "Belajar perkalian bilangan 1-10 untuk kelas 3 SD" },
    { title: "Energi dan Perubahannya", prompt: "Pengenalan konsep energi dan bentuk-bentuk energi untuk kelas 3 SD" },
    { title: "Kalimat Sederhana", prompt: "Belajar membuat kalimat sederhana dengan subjek dan predikat untuk kelas 3 SD" },
    { title: "Sumber Daya Alam", prompt: "Pengenalan sumber daya alam dan pemanfaatannya untuk kelas 3 SD" },
    { title: "Pecahan Sederhana", prompt: "Pengenalan konsep pecahan 1/2, 1/3, 1/4 untuk kelas 3 SD" },
  ],
  4: [
    { title: "Pembagian Bilangan", prompt: "Belajar pembagian bilangan untuk kelas 4 SD" },
    { title: "Gaya dan Gerak", prompt: "Pengenalan konsep gaya dan pengaruhnya terhadap gerak benda untuk kelas 4 SD" },
    { title: "Cerita dan Unsur-unsurnya", prompt: "Belajar mengidentifikasi tokoh, alur, dan setting dalam cerita untuk kelas 4 SD" },
    { title: "Siklus Air", prompt: "Pengenalan proses siklus air dan pentingnya air untuk kelas 4 SD" },
    { title: "Bangun Datar", prompt: "Pengenalan bangun datar dan cara menghitung luas serta keliling untuk kelas 4 SD" },
  ],
  5: [
    { title: "Bilangan Bulat", prompt: "Belajar operasi bilangan bulat positif dan negatif untuk kelas 5 SD" },
    { title: "Sistem Pencernaan", prompt: "Pengenalan sistem pencernaan manusia dan organ-organnya untuk kelas 5 SD" },
    { title: "Karangan Narasi", prompt: "Belajar menulis karangan narasi dengan alur yang runtut untuk kelas 5 SD" },
    { title: "Ekosistem", prompt: "Pengenalan ekosistem dan hubungan antar makhluk hidup untuk kelas 5 SD" },
    { title: "Bangun Ruang", prompt: "Pengenalan bangun ruang dan cara menghitung volume untuk kelas 5 SD" },
  ],
  6: [
    { title: "Aljabar Sederhana", prompt: "Pengenalan konsep aljabar dan persamaan linear sederhana untuk kelas 6 SD" },
    { title: "Sistem Peredaran Darah", prompt: "Pengenalan sistem peredaran darah manusia untuk kelas 6 SD" },
    { title: "Teks Argumentasi", prompt: "Belajar menulis teks argumentasi dengan pendapat dan alasan yang jelas untuk kelas 6 SD" },
    { title: "Tata Surya", prompt: "Pengenalan sistem tata surya dan planet-planet untuk kelas 6 SD" },
    { title: "Statistika Dasar", prompt: "Pengenalan diagram, rata-rata, dan modus untuk kelas 6 SD" },
  ],
};

async function generateMateri(kelas: number, title: string, prompt: string, model: string, apiKey: string) {
  const genAI = new GoogleGenAI({ apiKey });
  
  const audience = `Kelas ${kelas} SD`;
  const systemInstruction = `
Anda adalah penulis materi pembelajaran berbahasa Indonesia yang dirancang khusus agar nyaman dipahami oleh pengguna tunanetra melalui pembacaan Text-to-Speech (TTS) dan screen reader.

PRINSIP UTAMA (WAJIB DIPATUHI)
1) Jangan menulis kalimat pembuka meta seperti "Berikut adalah…", "Sebagai AI…", "Materi ini dirancang…", atau sejenisnya. Langsung mulai dari judul materi.
2) Output WAJIB Markdown yang rapi, konsisten, dan mudah dibaca TTS.
3) Fokus pada kejelasan dan kelengkapan. Tidak boleh ada kuis, soal pilihan ganda, atau bagian "Kuis/Latihan" berupa pertanyaan-pertanyaan evaluasi.
4) Hindari ketergantungan visual: jangan menulis "lihat gambar", "pada diagram", "di tabel". Jika butuh ilustrasi, jelaskan dalam kata-kata secara naratif.
5) TTS-friendly: gunakan kalimat relatif pendek, istilah teknis dijelaskan sekali saat pertama muncul, gunakan daftar bernomor untuk prosedur, dan hindari tabel Markdown (gunakan bullet/nomor sebagai pengganti).

FORMAT STRUKTUR (WAJIB ADA SEMUA)
- # Judul Materi
- ## Ringkasan Singkat (2–4 kalimat)
- ## Tujuan Pembelajaran (3–6 poin)
- ## Konsep Inti (pecah menjadi subbagian dengan heading ###)
- ## Contoh Praktis (minimal 2 contoh)
- ## Rangkuman (5–10 bullet poin)

ATURAN KONTEN
- Materi harus akurat dan relevan dengan "Target Kelas" dan "Judul Materi".
- Sesuaikan kedalaman materi berdasarkan tingkat kelas SD (usia 6-12 tahun):
  - Kelas 1-2 SD (usia 6-8): Bahasa sangat sederhana, kalimat pendek-pendek, banyak analogi dari kehidupan sehari-hari.
  - Kelas 3-4 SD (usia 8-10): Bahasa sederhana tapi mulai diperkenalkan istilah dasar dengan penjelasan.
  - Kelas 5-6 SD (usia 10-12): Bahasa lebih formal tapi tetap mudah dipahami, boleh gunakan istilah teknis dengan definisi jelas.
`;

  const userPrompt = `Target Kelas: ${audience}\nJudul Materi: ${title}\n\nBuat materi pembelajaran tentang: ${prompt}`;

  try {
    console.log(`📝 Generating: ${title} (Kelas ${kelas})...`);
    
    const result = await genAI.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [{ text: systemInstruction + "\n\n" + userPrompt }],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        topP: 0.95,
        topK: 40,
      },
    });

    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!generatedText) {
      throw new Error("Empty response from Gemini");
    }

    // Save to database
    await Prisma.materi_generated.create({
      data: {
        judul: title,
        prompt: prompt,
        konten: generatedText,
        model: model,
        audience: audience,
        format: "markdown",
        kelas: kelas,
        created_by: null,
      },
    });

    console.log(`✅ Saved: ${title}`);
  } catch (error) {
    console.error(`❌ Error generating ${title}:`, error);
    throw error;
  }
}

(async () => {
  try {
    console.log("🌱 Seeding materi pembelajaran...");

    const apiKey = process.env.GOOGLE_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";

    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY not found in environment variables");
    }

    await Prisma.$connect();

    // Generate materi untuk setiap kelas
    for (const [kelas, topics] of Object.entries(materiTopics)) {
      console.log(`\n📚 Generating materi untuk Kelas ${kelas} SD...`);
      
      for (const topic of topics) {
        await generateMateri(
          parseInt(kelas),
          topic.title,
          topic.prompt,
          model,
          apiKey
        );
        
        // Delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log("\n✅ All materi generated successfully!");
  } catch (error: unknown) {
    console.error(`❌ Error seeding materi: ${(error as Error).message}`);
    process.exit(1);
  } finally {
    await Prisma.$disconnect();
  }
})();
