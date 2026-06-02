import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin/users") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin?forbidden=1", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true;
        }
        return Boolean(token);
      }
    },
    pages: {
      signIn: "/admin/login"
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"]
};
