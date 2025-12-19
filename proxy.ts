import { NextResponse, NextRequest, MiddlewareConfig } from "next/server";
import { ADMIN_DASHBOARD, API_ADMIN, API_STUDENT, HOME, LOGIN, REGISTER, SESSION_TOKEN, STUDENT_DASHBOARD, USER_INFO } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { nextUrl } = request;
  const token = request.cookies.get(SESSION_TOKEN)?.value;
  const user = request.cookies.get(USER_INFO)?.value as Peran;

  if (nextUrl.pathname.startsWith("/_next") || nextUrl.pathname.startsWith("/images")) {
    return NextResponse.next();
  }

  const isAlreadyAtCorrectDashboard = (user === Peran.ADMIN && nextUrl.pathname.startsWith(ADMIN_DASHBOARD)) || (user === Peran.SISWA && nextUrl.pathname.startsWith(STUDENT_DASHBOARD));
  if (token && isAlreadyAtCorrectDashboard) {
    return NextResponse.next();
  }
  // -----------------------------------------------------

  if (token && (nextUrl.pathname === LOGIN || nextUrl.pathname === REGISTER)) {
    const target = user === Peran.ADMIN ? ADMIN_DASHBOARD : STUDENT_DASHBOARD;
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (nextUrl.pathname === LOGIN || nextUrl.pathname === REGISTER) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  const isStudentAccessArea = nextUrl.pathname.startsWith(STUDENT_DASHBOARD) || nextUrl.pathname.startsWith(API_STUDENT);
  const isAdminAccessArea = nextUrl.pathname.startsWith(ADMIN_DASHBOARD) || nextUrl.pathname.startsWith(API_ADMIN);

  if (user === Peran.ADMIN && isStudentAccessArea) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
  }

  if (user === Peran.SISWA && isAdminAccessArea) {
    return NextResponse.redirect(new URL(STUDENT_DASHBOARD, request.url));
  }

  if (nextUrl.pathname === HOME) {
    const target = user === Peran.ADMIN ? ADMIN_DASHBOARD : STUDENT_DASHBOARD;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};