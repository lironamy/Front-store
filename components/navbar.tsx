import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import NavbarSearch from "@/components/navbar-search";


const Navbar = async () => {
  const categories = await getCategories();



  return ( 
    <div className="border-b navMain">
      <Container>
        <div className="flex justify-around items-center h-16 p-4 gap-2">
          <MainNav data={categories} />
          <Link href="/" className="sm:mr-44 flex ml-4 gap-x-1 items-center flex-1 ">
            <p className="font-bold text-xl">SunFire </p>
          </Link>
          <div className="hidden sm:block">
          <NavbarSearch  />
          </div>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );

};
 
export default Navbar;
