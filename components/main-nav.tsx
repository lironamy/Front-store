"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { useState } from 'react';
import { GrClose, GrMenu } from 'react-icons/gr';

import { cn } from "@/lib/utils"
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}


const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);

    // Toggle body scroll lock
    document.body.classList.toggle('overflow-hidden', !open);
  };

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,

  }));

  return (
    <>
      {/* Mobile Navbar */}
      <div className="sm:hidden flex-1 justify-center text-left text-[25px] items-center mt-2 ml-2">
        <button
          onClick={toggleMenu}
          className="text-neutral-500 hover:text-black"
        >
          {open ? <GrClose /> : <GrMenu />}
        </button>

        <nav
          className={cn(
            'flex flex-col bg-white absolute p-5 top-16 left-1/2 w-full transform -translate-x-1/2 z-50',
            { 'hidden': !open, 'flex': open },
          )}
        >
         
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
            >
              <div
                onClick={toggleMenu}
                className={cn(
                  'block py-2 px-4 text-right transition-colors hover:text-black',
                  route.active ? 'text-black' : 'text-neutral-500'
                )}
              >
                {route.label}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Navbar */}
      <nav
        className={cn(
          'hidden sm:flex flex-1 justify-center gap-x-4',
          'text-sm font-medium text-neutral-500'
        )}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-black',
              route.active ? 'text-black' : 'text-neutral-500'
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MainNav;