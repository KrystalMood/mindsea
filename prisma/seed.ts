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
    await Prisma.pengguna.createMany({
      data: [
        {
          nama: "Administrator",
          surel: process.env.SUPERUSER_EMAIL as string,
          kata_sandi: await hash(process.env.SUPERUSER_PASSWORD as string, 10),
          peran: Peran.ADMIN,
        },
        {
          nama: "Alan Turing",
          surel: "alan@mindsea.com",
          kata_sandi: await hash("alan123", 10),
          peran: Peran.SISWA,
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