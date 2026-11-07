export const dynamic = 'force-dynamic';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const animals = await prisma.animal.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: animals });
  } catch (error) {
    console.error('API Error GET:', error);
    return NextResponse.json({ success: false, message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.tag) {
      return NextResponse.json({ success: false, message: 'Tag wajib diisi.' }, { status: 400 });
    }

    const cleanTag = body.tag.trim();

    // Mengirim tanggal sebagai string atau null sesuai skema
    const animalData = {
      tag: cleanTag,
      type: body.type || 'Sapi',
      breed: body.breed || 'FH',
      gender: body.gender || 'Betina',
      weight: parseFloat(body.weight) || 0,
      age: parseInt(body.age) || 0,
      buyPrice: parseFloat(body.buyPrice) || 0,
      feedCost: parseFloat(body.feedCost) || 0,
      milkVolume: parseFloat(body.milkVolume) || 0,
      maleCalves: parseInt(body.maleCalves) || 0,
      femaleCalves: parseInt(body.femaleCalves) || 0,
      lastCalvingDate: body.lastCalvingDate ? String(body.lastCalvingDate) : null,
      reproStatus: body.reproStatus || 'Laktasi',
      healthStatus: body.healthStatus || 'Sehat',
      lastVaccineDate: body.lastVaccineDate ? String(body.lastVaccineDate) : null,
      vaccineName: body.vaccineName || '',
      vet: body.vet || '',
    };

    let result;
    const existing = await prisma.animal.findUnique({
      where: { tag: cleanTag }
    });

    if (existing) {
      result = await prisma.animal.update({
        where: { id: existing.id },
        data: animalData,
      });
    } else {
      result = await prisma.animal.create({
        data: animalData,
      });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error POST:', error);
    return NextResponse.json({ success: false, message: 'Gagal menyimpan ke database' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID tidak ditemukan.' }, { status: 400 });
    }

    await prisma.animal.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, message: 'Data berhasil dihapus.' });
  } catch (error) {
    console.error('Gagal menghapus data:', error);
    return NextResponse.json({ success: false, message: 'Gagal menghapus data dari database.' }, { status: 500 });
  }
}