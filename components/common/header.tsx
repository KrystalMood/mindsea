import { LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Sidebar as SidebarMenus } from "@/constants/menu";
import { API_AUTH_LOGOUT, LOGIN } from "@/constants/route";
import { Peran } from "@/lib/generated/prisma";
import axios from "axios";
import Image from "next/image";

function AuthHeader({ setSidebarOpen, role }: { setSidebarOpen: Dispatch<SetStateAction<boolean>>; role: Peran }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getActiveLabel = () => {
    const allPossibleMenus = (SidebarMenus[role] || []).flatMap((menu) => menu.subMenu ? [menu, ...menu.subMenu] : [menu]);
    const activeMenu = allPossibleMenus.find((menu) => menu.href === pathname);
    if (activeMenu) return activeMenu.label;
    return role === Peran.ADMIN ? "Admin Panel" : "Beranda";
  };

  const profileInfo = {
    nama: role === Peran.ADMIN ? "Administrator" : "Siswa Mindsea",
    surel: role === Peran.ADMIN ? "admin@mindsea.com" : "siswa@mindsea.com",
  };

  const logout = async () => {
    try {
      await axios.post(API_AUTH_LOGOUT);
      router.push(LOGIN);
    } catch (error: unknown) {
      console.error(`❌ Terjadi kesalahan saat keluar dari akun: ${(error as Error).message}`);
      throw error;
    }
  };

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-gray-200 bg-slate-50 px-6 py-2.75 shadow-sm lg:py-4">
      <section className="flex items-center gap-2 lg:gap-4">
        <button onClick={() => setSidebarOpen((prev) => !prev)} className="cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <Menu className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
        <h4 className="cursor-default text-sm font-semibold text-gray-800 lg:text-lg">
          {getActiveLabel()}
        </h4>
      </section>
      <section className="relative">
        <button onClick={() => setIsDropdownOpen((prev) => !prev)} className="flex cursor-pointer items-center gap-3 focus:outline-none">
          <div className="hidden text-right text-sm lg:block">
            <p className="font-semibold text-gray-700">{profileInfo.nama}</p>
            <p className="text-xs text-gray-500">{profileInfo.surel}</p>
          </div>
          <Image src="/images/profile-photo.png" alt="Profile" width={40} height={40} className="h-7 w-7 rounded-full border border-gray-200 object-cover lg:h-10 lg:w-10" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-48 rounded border border-gray-100 bg-white py-2 shadow-lg">
            <button onClick={logout} className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 lg:text-sm">
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        )}
      </section>
    </header>
  );
}

function PublicHeader() {
  return <header>Public Header</header>;
}

export { AuthHeader, PublicHeader };