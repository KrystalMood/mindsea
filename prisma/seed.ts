import { hash } from "bcryptjs";
import { Peran } from "@/lib/generated/prisma";
import { Prisma } from "@/lib/prisma";

// prettier-ignore
(async () => {
  try {
    console.log("🌱 Seeding database...");

    if (!process.env.SUPERUSER_EMAIL || !process.env.SUPERUSER_PASSWORD) {
      throw new Error("Nama pengguna dan kata sandi admin harus disetel dalam variabel lingkungan.");
    }

    await Prisma.$connect();
    await Prisma.pengguna.deleteMany();
    
    // Hash all passwords first
    const adminPassword = await hash(process.env.SUPERUSER_PASSWORD as string, 10);
    const andiPassword = await hash("andi123", 10);
    const budiPassword = await hash("budi123", 10);
    const citraPassword = await hash("citra123", 10);
    const doniPassword = await hash("doni123", 10);
    const ekaPassword = await hash("eka123", 10);
    const fajarPassword = await hash("fajar123", 10);
    const gitaPassword = await hash("gita123", 10);
    const hendraPassword = await hash("hendra123", 10);
    const indahPassword = await hash("indah123", 10);
    const jokoPassword = await hash("joko123", 10);
    
    // Buat 1 admin dan 10 siswa
    await Prisma.pengguna.createMany({
      data: [
        // Admin
        {
          nama: "Administrator",
          surel: process.env.SUPERUSER_EMAIL as string,
          kata_sandi: adminPassword,
          peran: Peran.ADMIN,
          kelas: null,
        },
        // 10 Siswa dengan kelas berbeda
        {
          nama: "Andi Pratama",
          surel: "andi@mindsea.com",
          kata_sandi: andiPassword,
          peran: Peran.SISWA,
          kelas: 1,
        },
        {
          nama: "Budi Santoso",
          surel: "budi@mindsea.com",
          kata_sandi: budiPassword,
          peran: Peran.SISWA,
          kelas: 2,
        },
        {
          nama: "Citra Dewi",
          surel: "citra@mindsea.com",
          kata_sandi: citraPassword,
          peran: Peran.SISWA,
          kelas: 3,
        },
        {
          nama: "Doni Setiawan",
          surel: "doni@mindsea.com",
          kata_sandi: doniPassword,
          peran: Peran.SISWA,
          kelas: 4,
        },
        {
          nama: "Eka Putri",
          surel: "eka@mindsea.com",
          kata_sandi: ekaPassword,
          peran: Peran.SISWA,
          kelas: 5,
        },
        {
          nama: "Fajar Nugroho",
          surel: "fajar@mindsea.com",
          kata_sandi: fajarPassword,
          peran: Peran.SISWA,
          kelas: 6,
        },
        {
          nama: "Gita Maharani",
          surel: "gita@mindsea.com",
          kata_sandi: gitaPassword,
          peran: Peran.SISWA,
          kelas: 1,
        },
        {
          nama: "Hendra Wijaya",
          surel: "hendra@mindsea.com",
          kata_sandi: hendraPassword,
          peran: Peran.SISWA,
          kelas: 2,
        },
        {
          nama: "Indah Permata",
          surel: "indah@mindsea.com",
          kata_sandi: indahPassword,
          peran: Peran.SISWA,
          kelas: 3,
        },
        {
          nama: "Joko Susilo",
          surel: "joko@mindsea.com",
          kata_sandi: jokoPassword,
          peran: Peran.SISWA,
          kelas: 4,
        },
      ],
    });
  } catch (error: unknown) {
    console.error(`❌ Error seeding: ${(error as Error).message}`);
    process.exit(1);
  } finally {
    console.log("✅ Database seeded.");
    await Prisma.$disconnect();
  }
})();