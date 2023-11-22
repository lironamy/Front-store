import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import logo from "../app/logo.png";

const Navbar = async () => {
  const categories = await getCategories();


  return ( 
    <div className="border-b navMain">
      <Container>
        <div className="flex justify-around items-center h-16 p-4 ">
          <MainNav data={categories} />
          <Link href="/" className="ml-8 flex lg:ml-0 gap-x-2 items-center flex-1 logoHd">
            <Image src={logo} alt="logo" className="w-20 h-20 mt-5 z-100" />
          </Link>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );

};
 
export default Navbar;
