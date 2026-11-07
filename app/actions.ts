'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Fungsi untuk mengambil semua data ternak
export async function getAnimals() {
  try {
    const animals = await prisma.animal.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return animals;
  } catch (error) {
    console.error("Gagal mengambil data ternak:", error);
    return [];
  }
}

// Fungsi untuk menambah data ternak baru
export async function createAnimal(formData: FormData) {
  try {
    const tag = formData.get('tag') as string;
    const type = formData.get('type') as string;
    const breed = formData.get('breed') as string;
    const gender = formData.get('gender') as string;
    const weight = parseFloat(formData.get('weight') as string) || 0;
    const age = parseInt(formData.get('age') as string) || 0;
    const milkVolume = parseFloat(formData.get('milkVolume') as string) || 0;
    const reproStatus = formData.get('reproStatus') as string;
    const healthStatus = formData.get('healthStatus') as string;
    const buyPrice = parseFloat(formData.get('buyPrice') as string) || 0;
    const feedCost = parseFloat(formData.get('feedCost') as string) || 0;

    await prisma.animal.create({
      data: {
        tag,
        type,
        breed,
        gender,
        weight,
        age,
        milkVolume,
        reproStatus,
        healthStatus,
        buyPrice,
        feedCost,
      },
    });

    // Segarkan halaman utama agar data terbaru langsung muncul
    revalidatePath('/');
    return { success: true, message: 'Data ternak berhasil ditambahkan!' };
  } catch (error) {
    console.error("Gagal menambah ternak:", error);
    return { success: false, message: 'Gagal menambahkan data ternak. Pastikan Tag ID belum digunakan.' };
  }
}