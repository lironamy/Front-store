"use client";

import { ShoppingCart } from "lucide-react";
import { useState, ChangeEvent } from "react";
import z from "zod";
import Currency  from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

interface InfoProps {
  data: Product
  
};

const quantitySchema = z.object({
  quantity: z.number().int({
    message: 'כמות חייבת להיות מספר שלם'
  }).min(1, { message: 'כמות חייבת להיות גדולה מ-0' }).max(1000, { message: 'כמות חייבת להיות קטנה מ-1000' })
});

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

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

  const onAddToCart = () => {
    const res = quantitySchema.safeParse({ quantity: quantity });

    let order = {
      ...data,
      orderQuantity: quantity
    };

    if (!res.success) {
      toast.error(res.error.errors[0].message);
    } else if ( quantity > data.quantity) {
      toast.error('כמות גדולה מהמלאי');
    } else {
      cart.addItem(order);
    }
  };

  const incrementQuantity = () => {
    setError (null);
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setError (null);

    if (quantity >= 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">רשיון:</h3>
          <div>
            {data?.size?.value}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">צבע:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center gap-x-6">
        <h3 className="font-semibold text-black">כמות:</h3>
        <div className="flex items-center">
          <Button
            disabled={quantity <= 1 ? true : false}
            onClick={decrementQuantity}
            className="rounded-r-none rounded-l-2xl  h-6 w-6  flex justify-center items-center  disabled:cursor-none disabled:pointer-events-none select-none "
          >
            -
          </Button>
          <input
            className="rounded-none w-12 h-10 text-center focus-visible:ring-0"
            onChange={handleQuantity}
            value={quantity || undefined}
            min={1}
            max={1000}
            type="text"
            placeholder="1"
          />
          <Button
            disabled={quantity >= data.quantity ? true : false}
            onClick={incrementQuantity}
            className="rounded-l-none h-6 w-6 flex justify-center items-center disabled:cursor-none disabled:pointer-events-none select-none"
          > +
          </Button>
        </div>
      </div>
        
   
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          הוסף לעגלה
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
}
 
export default Info;
