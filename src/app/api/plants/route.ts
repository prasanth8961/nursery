import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TREFLE_API_TOKEN;
  try {
    const res = await fetch(`https://trefle.io/api/v1/plants?token=${token}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plants' }, { status: 500 });
  }
}
