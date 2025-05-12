'use client'

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const UserHeader = (pros: any) => {

  // const { data: session, status } = useSession()
  const { session } = pros
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()
  const menu = [
    { label: "Trang chủ", href: "/home" },
    { label: "Lịch trình", href: "/schedule" },
    // { label: "Đặt vé", href: "/booking" }
  ];

  const handleLogout = () => {
    // TODO: Thêm logic đăng xuất ở đây
    signOut({ callbackUrl: '/auth/login' })
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="bg-my-gradient flex justify-center h-20 w-full rounded-b-4xl fixed z-50 ">
      <div className="grid grid-cols-3 h-full container-width justify-between items-center  text-white">
        {/* Menu trái */}
        <nav className="flex flex-row gap-6 text-header font-medium justify-start ">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-300 ${pathname === item.href ? "underline underline-offset-4" : ""
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo giữa */}
        <div className=" flex flex-col items-center justify-center w-32 h-full relative justify-self-center ">
          <img src="/logo.png" alt="Logo" className="w-24 h-20 object-contain" />
          <span className="text-1xl font-bold tracking-wide absolute bottom-0.25 select-none">VéXePro</span>
        </div>

        {/* Menu phải */}
        <nav className="relative inline-block text-left text-header font-medium justify-self-end" ref={menuRef}>
          {/* <Link href="/auth/login" className="hover:underline">Đăng nhập</Link>
          <Link href="/auth/register" className="hover:underline">Đăng ký</Link> */}
          <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition hover:cursor-pointer"
            onClick={() => { setShowMenu(!showMenu) }}>
            {session?.user ?
              <span className="text-black text-sm">{session?.user.name}</span> :
              <span className="text-black text-sm">Đăng nhập/Đăng ký</span>}
            <div className="bg-white rounded-full p-1">
              <img src="/icons/user.svg" alt="User Icon" className="w-5 h-5 text-gray-600" />
            </div>
          </button>
          {showMenu && session?.user && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <div className="font-medium">{session.user.name}</div>
                <div className="text-xs text-gray-500">{session.user.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default UserHeader


