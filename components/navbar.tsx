import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = async () => {
  const categories = await getCategories();



  return ( 
    <div className="border-b navMain">
      <Container>
        <div className="flex justify-around items-center h-16 p-4 ">
          <MainNav data={categories} />
          <Link href="/" className="ml-6 flex lg:ml-0 gap-x-1 items-center flex-1 ">
            <p className="font-bold text-xl">SunFire </p>
          </Link>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );

};
 
export default Navbar;
