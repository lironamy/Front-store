"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { set } from "zod";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('תשלום בוצע בהצלחה');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('משהו השתבש בתשלום');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((acc, item) => {
    // Convert item.price to a number before multiplying
    const itemPrice = parseFloat(item.price);
    
    // Check if the conversion was successful and item.orderQuantity is a number
    if (!isNaN(itemPrice) && typeof item.orderQuantity === 'number') {
      return acc + (itemPrice * item.orderQuantity);
    } else {
      // Handle the case where conversion fails or orderQuantity is not a number
      console.error(`Invalid price or order quantity for item: ${JSON.stringify(item)}`);
      return acc;
    }
  }, 0);


  const onCheckout = async () => {
    setLoading(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, { cartItems: items.map((item) => item )});
    setLoading(false);

    window.location = response.data.url;
  };

  const clicked = () => {
    console.log('res', { items: items.map((item) => ({ id: item.id, quantity: item.orderQuantity, orderSize: item.orderSize }) )});
  }

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
      סיכום הזמנה
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">סך הכל</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        תשלום
      </Button>
    </div>
  );
}
 
export default Summary;
