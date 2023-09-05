import { NextResponse } from 'next/server';
import sslChecker from 'ssl-checker';

export async function POST(request: Request) {
  const body = await request.json();

  const urlToCheckSSLInfo = body.url.replace('https://', '');
  // const sslInfo = await sslChecker(urlToCheckSSLInfo);

  const sslInfo = 'bla';

  return NextResponse.json(sslInfo, {
    status: 201,
  });
}
