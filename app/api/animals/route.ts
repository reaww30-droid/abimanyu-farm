import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Paksa gunakan URL dan Key langsung agar tidak pernah gagal saat build Vercel
const supabaseUrl = 'https://tsojjspoqaaieelliygl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_JtpWksibdhiEj2NQGpSF3g_xDmTSxhS';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fungsi Helper untuk parsing tanggal
const parseDate = (val: unknown) => {
  if (!val || val === '') return null;
  const date = new Date(val as string | number | Date);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('Animal')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
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

    const tagValue = String(body.tag);

    const payload = {
      tag: tagValue,
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

    const { data, error } = await supabase
      .from('Animal')
      .upsert(payload, { onConflict: 'tag' })
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving animal:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}