'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Inisialisasi Supabase Client menggunakan URL dan Public Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tsojjspoqaaieelliygl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi untuk mengambil semua data ternak
export async function getAnimals() {
  try {
    const { data, error } = await supabase
      .from('Animal')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
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
    
    // Pemetaan input form ke nama kolom Supabase
    const milkProduction = formData.get('milkVolume') ? parseFloat(formData.get('milkVolume') as string) : null;
    const lactationStatus = (formData.get('reproStatus') as string) || '';
    const healthStatus = (formData.get('healthStatus') as string) || 'Sehat Walafiat';
    const purchasePrice = formData.get('buyPrice') ? parseFloat(formData.get('buyPrice') as string) : null;
    const feedCost = formData.get('feedCost') ? parseFloat(formData.get('feedCost') as string) : null;

    const payload = {
      tag,
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
      updatedAt: new Date().toISOString(),
    };

    // Fitur upsert bawaan Supabase SDK berbasis kolom unik 'tag'
    const { error } = await supabase
      .from('Animal')
      .upsert(payload, { onConflict: 'tag' });

    if (error) {
      console.error("Supabase API Error:", error);
      return { success: false, message: `Gagal menyimpan: ${error.message}` };
    }

    revalidatePath('/');
    return { success: true, message: 'Data ternak berhasil disimpan!' };
  } catch (error) {
    console.error("Gagal menyimpan ternak:", error);
    return { success: false, message: 'Gagal menyimpan data ternak ke database.' };
  }
}