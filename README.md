## Coisas para fazer

- Criar monitoramento de performance
  - Criar collection nova no firebase
    - siteId
    - Date
    - score
  - Criar rotina e função para checar performance
    - Salvar no firebase após rodar

- Fazer upgrade do plano

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const guestRoutes = ['/login', '/reset-password'];

export function middleware(request: NextRequest) {
  const isGuestRoute = guestRoutes.includes(request.nextUrl.pathname);
  if (isGuestRoute) {
    return NextResponse.next();
  }

  const token = request.cookies?.get('next-auth.session-token')?.value;

  if (!token && !isGuestRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/((?!api|_next/static|favicon.ico).*)'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)'],
};
