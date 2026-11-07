'use server';

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

// Fungsi untuk menambah atau memperbarui data ternak
export async function createAnimal(formData: FormData) {
  try {
    const tag = formData.get('tag') as string;
    if (!tag) {
      return { success: false, message: 'Tag ID hewan wajib diisi!' };
    }

    const type = (formData.get('type') as string) || 'Sapi';
    const breed = (formData.get('breed') as string) || '';
    const gender = (formData.get('gender') as string) || '';
    const weight = formData.get('weight') ? parseFloat(formData.get('weight') as string) : null;
    const age = formData.get('age') ? parseInt(formData.get('age') as string) : null;
    
    // Disesuaikan dengan nama kolom di Prisma (milkProduction, lactationStatus, purchasePrice)
    const milkProduction = formData.get('milkVolume') ? parseFloat(formData.get('milkVolume') as string) : null;
    const lactationStatus = (formData.get('reproStatus') as string) || '';
    const healthStatus = (formData.get('healthStatus') as string) || 'Sehat Walafiat';
    const purchasePrice = formData.get('buyPrice') ? parseFloat(formData.get('buyPrice') as string) : null;
    const feedCost = formData.get('feedCost') ? parseFloat(formData.get('feedCost') as string) : null;

    const animalData = {
      type,
      breed,
      gender,
      weight,
      age,
      milkProduction,
      lactationStatus,
      healthStatus,
      purchasePrice,
      feedCost,
    };

    // Menggunakan upsert agar aman jika tag sudah ada
    await prisma.animal.upsert({
      where: { tag: tag },
      update: animalData,
      create: {
        tag: tag,
        ...animalData,
      },
    });

    revalidatePath('/');
    return { success: true, message: 'Data ternak berhasil disimpan!' };
  } catch (error) {
    console.error("Gagal menyimpan ternak:", error);
    return { success: false, message: 'Gagal menyimpan data ternak ke database.' };
  }
}