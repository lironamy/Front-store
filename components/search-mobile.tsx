"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { Search } from "lucide-react";
import Button from "@/components/ui/button";

 
const formSchema = z.object({
  search: z.string().min(1).max(50),
})

const MobileSearch = () => {

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

    return ( 
        <form onSubmit={form.handleSubmit(onSubmit)}  className="w-[280px]  relative ">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">חפש</label>
            <div className="relative">
              
                <input
                    type="search"
                    id="default-search"
                    className="w-full p-2  rounded-full bg-gray-100"
                    placeholder="חפש"
                    {...form.register('search')}
                />

                    <Button
                      type="submit"
                      className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black"
                  >
                      <Search
                       size={20}
                       color="white"
                      />
                  </Button>
            </div>
        </form>
     );
}
 
export default MobileSearch;