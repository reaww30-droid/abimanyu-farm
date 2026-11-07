import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.tag) {
      return NextResponse.json({ error: 'Tag hewan wajib diisi' }, { status: 400 });
    }

    const parseDate = (val: unknown) => {
      if (!val || val === '') return null;
      const date = new Date(val as string | number | Date);
      return isNaN(date.getTime()) ? null : date;
    };

    const tagValue = String(body.tag);

    // Menggunakan type inference standar tanpa definisi manual yang kaku
    const updateData = {
      type: body.type ? String(body.type) : 'Sapi',
      breed: body.breed ? String(body.breed) : '',
      gender: body.gender ? String(body.gender) : '',
      weight: body.weight !== undefined && body.weight !== '' ? Number(body.weight) : null,
      age: body.age !== undefined && body.age !== '' ? Number(body.age) : null,
      milkProduction: body.milkProduction !== undefined && body.milkProduction !== '' ? Number(body.milkProduction) : null,
      maleCalves: body.maleCalves !== undefined && body.maleCalves !== '' ? Number(body.maleCalves) : null,
      femaleCalves: body.femaleCalves !== undefined && body.femaleCalves !== '' ? Number(body.femaleCalves) : null,
      lastCalvingDate: parseDate(body.lastCalvingDate),
      lactationStatus: body.lactationStatus ? String(body.lactationStatus) : '',
      healthStatus: body.healthStatus ? String(body.healthStatus) : 'Sehat Walafiat',
      lastVaccineDate: parseDate(body.lastVaccineDate),
      vaccineType: body.vaccineType ? String(body.vaccineType) : '',
      vetName: body.vetName ? String(body.vetName) : '',
      purchasePrice: body.purchasePrice !== undefined && body.purchasePrice !== '' ? Number(body.purchasePrice) : null,
      feedCost: body.feedCost !== undefined && body.feedCost !== '' ? Number(body.feedCost) : null,
    };

    const animal = await prisma.animal.upsert({
      where: { tag: tagValue },
      update: updateData as any,
      create: {
        tag: tagValue,
        ...updateData,
      } as any,
    });

    return NextResponse.json(animal);
  } catch (error) {
    console.error('Error saving animal:', error);
    return NextResponse.json({ error: 'Gagal menyimpan ke database' }, { status: 500 });
  }
}