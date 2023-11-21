import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Link href="/" className="mr-4 flex lg:mr-0 gap-x-2 items-center">
            <p className="font-bold text-xl">SunFire</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;
