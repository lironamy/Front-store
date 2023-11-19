import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import Button from "@/components/ui/button";
import { useState, ChangeEvent} from "react";
import { z } from "zod";



export interface CartOrder  extends Product {
  data: Product;
}

const CartItem: React.FC<CartOrder> = ({
  data 
}) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(data.orderQuantity);

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const decrementQuantity = () => {
    console.log('Decrementing quantity...');
    cart.decrementQuantity(data.id);
  }
  
  const incrementQuantity = () => {
    console.log('Incrementing quantity...');
    cart.incrementQuantity(data.id);
  }
  

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    let error = null;
  
    if (e.target.value === '') {
      setQuantity(0);
      error = 'כמות חייבת להיות מספר שלם';
    } else {
      setQuantity(parseInt(e.target.value));
    }
    alert(error);
  };

  
  

  return ( 
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-contain object-center"
        />
      </div>
      <div className="relative mr-4 flex flex-1 flex-col justify-between sm:mr-6">
        <div className="absolute z-10 left-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.name}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="mr-4 border-r border-gray-200 pr-4 text-gray-500">{data.size.name}</p>
          </div>
          <Currency value={data.price} />
        
        <div className="flex items-center mt-5 md:mt-16 ">
        <div className="flex items-center">
          <Button
            disabled={data.orderQuantity <= 1 ? true : false}
            onClick={decrementQuantity}
            className="rounded-full  h-6 w-6  flex justify-center items-center  disabled:cursor-none disabled:pointer-events-none select-none "
          >
            -
          </Button>
          <input
            className="rounded w-12 h-10 text-center focus-visible:ring-0"
            onChange={handleQuantity}
            value={data.orderQuantity || undefined}
            min={1}
            max={10}
            type="text"
            placeholder="1"
          />
          <Button
            disabled={data.orderQuantity >= data.quantity ? true : false}
            onClick={incrementQuantity}
            className="rounded-full h-6 w-6 flex justify-center items-center disabled:cursor-none disabled:pointer-events-none select-none"
          > +
          </Button>
        </div>
      </div>
        </div>
      </div>
    </li>
  );
}
 
export default CartItem;
function setError(arg0: null) {
  throw new Error("Function not implemented.");
}

