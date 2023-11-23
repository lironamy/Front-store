
"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { AiOutlineSearch } from "react-icons/ai";
import { Search } from "lucide-react";
import Button from "@/components/ui/button";

 
const formSchema = z.object({
  search: z.string().min(1).max(50),
})

const NavbarSearch = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          search: "",
      },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(values);
      router.push(`/search/${values.search}`);
  };

  const searchBtn = () => {
    router.push(`/search/no-results`);
  }

  return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-[280px]  relative ">
          {/* Displayed only on mobile */}
          <div className="block sm:hidden ">
              <Button
                  type="submit"
                  className="flex items-center rounded-full bg-black p-2"
                  onClick={searchBtn}
              >
                  <Search
                   size={20}
                   color="white"
                  />
              </Button>
          </div>

          {/* Displayed only on larger screens */}
          <div className="hidden sm:block">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                  חפש
              </label>
              <div className="relative">
                  <input
                      type="search"
                      id="default-search"
                      className="w-full p-2 rounded-full bg-gray-200"
                      placeholder="חפש"
                      {...form.register('search')}
                  />
                  <Button
                      type="submit"
                      className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black p-2"
                  >
                      <Search
                       size={20}
                       color="white"
                      />
                  </Button>
              </div>
          </div>
      </form>
  );
};

export default NavbarSearch;