import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  console.log('aqui');
  const cookieStore = cookies();
  const redirectURL = new URL('https://google.com');

  cookieStore.delete('mypageup.token');
  return NextResponse.redirect(redirectURL);
}
