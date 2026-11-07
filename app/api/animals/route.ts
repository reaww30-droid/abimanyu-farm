import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Memaksa Next.js agar tidak merender halaman ini secara statis saat build
export const dynamic = 'force-dynamic';

// Singleton pattern agar tidak kehabisan koneksi database
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// GET: Ambil semua data hewan
export async function GET() {
  try {
    const animals = await prisma.animal.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(animals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST: Tambah atau Update data hewan
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi tag wajib ada
    if (!body.tag) {
      return NextResponse.json({ error: 'Tag hewan wajib diisi' }, { status: 400 });
    }

    const animalData = {
      tag: String(body.tag),
      type: body.type || 'Sapi',
      breed: body.breed || '',
      gender: body.gender || '',
      weight: body.weight ? Number(body.weight) : null,
      age: body.age ? Number(body.age) : null,
      milkProduction: body.milkProduction ? Number(body.milkProduction) : null,
      maleCalves: body.maleCalves ? Number(body.maleCalves) : null,
      femaleCalves: body.femaleCalves ? Number(body.femaleCalves) : null,
      lastCalvingDate: body.lastCalvingDate || null,
      lactationStatus: body.lactationStatus || '',
      healthStatus: body.healthStatus || 'Sehat Walafiat',
      lastVaccineDate: body.lastVaccineDate || null,
      vaccineType: body.vaccineType || '',
      vetName: body.vetName || '',
      purchasePrice: body.purchasePrice ? Number(body.purchasePrice) : null,
      feedCost: body.feedCost ? Number(body.feedCost) : null,
    };

    const animal = await prisma.animal.upsert({
      where: { tag: animalData.tag },
      update: animalData,
      create: animalData,
    });

    return NextResponse.json(animal);
  } catch (error) {
    console.error('Error saving animal:', error);
    return NextResponse.json({ error: 'Gagal menyimpan ke database' }, { status: 500 });
  }
}