import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

function middleware() {
  return NextResponse.next();
}

export default withAuth(middleware, {
  pages: {
    signIn: '/signin',
    error: '/error',
    newUser: '/signin',
    signOut: '/signin',
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const unRequiredPaths = ['/signin', '/error'];
      const isLoggedIn = !!token;
      const requiredAuth = !unRequiredPaths.includes(req.nextUrl.pathname);

      return !requiredAuth || (requiredAuth && isLoggedIn);
    },
  },
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
