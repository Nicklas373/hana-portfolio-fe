import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      success: true,
      message: 'Healthy upstream',
      data: [],
      error: null,
    },
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
