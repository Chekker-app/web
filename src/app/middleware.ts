import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const guestRoutes = ['/login', '/reset-password'];

export async function middleware(request: NextRequest) {
  const isGuestRoute = guestRoutes.includes(request.nextUrl.pathname);
  if (isGuestRoute) {
    return NextResponse.next();
  }

  const decoded = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!decoded && !isGuestRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/((?!api|_next/static|favicon.ico).*)'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)'],
};
