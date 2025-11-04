import { NextResponse } from 'next/server';
import { getWells } from '@/lib/api/wells';

export const revalidate = 86400;

export async function GET() {
  try {
    const wells = await getWells();
    return NextResponse.json(wells);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wells' }, { status: 500 });
  }
}