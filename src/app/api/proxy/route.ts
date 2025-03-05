import { NextResponse } from 'next/server';

export async function GET() {
  const url =
    'https://sleakops-interview-tests.s3.us-east-1.amazonaws.com/rds_us_east_1_pricing.json';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
