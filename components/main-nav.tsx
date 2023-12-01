"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from 'react';
import { GrClose, GrMenu } from 'react-icons/gr';
import { Dialog } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import NavbarSearch from "./navbar-search";

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
  };

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      {/* Mobile Navbar */}
      <div className="justify-center flex-1 sm:text-[25px] text-[20px] items-center mt-2 ">
        <button
          onClick={toggleMenu}
          className="text-neutral-500 hover:text-black"
        >
          {open ? <GrClose /> : <GrMenu />}
        </button>

        <Dialog
          open={open}
          as="div"
          className="absolute inset-0 overflow-hidden"
          onClose={toggleMenu}
        >
          {/* Background color and opacity */}
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />

          <Dialog.Panel
            className={cn(
              'flex flex-col bg-white fixed p-5 top-16 left-1/2 w-full transform -translate-x-1/2 z-101 ',
              { 'hidden': !open, 'flex': open },
            )}
          >
            <div className="block sm:hidden mx-3 border-none">
              <NavbarSearch />
            </div>

            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Dialog.Panel
                  onClick={() => {
                    toggleMenu();
                  }}
                  className={cn(
                    'block py-2 px-4 text-right transition-colors hover:text-black border-b border-neutral-200 sm:text-[25px] text-[20px]',
                    route.active ? 'text-black ' : 'text-neutral-500'
                  )}
                >
                  {route.label}
                </Dialog.Panel>
              </Link>
            ))}
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  );
};

export default MainNav;
