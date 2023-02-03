import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwtDecode from 'jwt-decode';

type parseToken = {
  userId: string,
  isAdmin: boolean,
  iat: number
}

export function middleware(request: NextRequest) {
  const cookie = (request.cookies.get('fish-auth-user'));
  const url = request.url;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (url.includes("/admin")) {

      if (cookie === undefined) return NextResponse.redirect(new URL('/', url))

      try {
        const { isAdmin }: parseToken = jwtDecode(cookie);
        if (isAdmin) return NextResponse.next();
      } catch (e) {
        return NextResponse.redirect(new URL('/', url))
      }
    }
    return NextResponse.redirect(new URL('/', url))
  }
}

export const config = {
  matcher: '/admin',
}
