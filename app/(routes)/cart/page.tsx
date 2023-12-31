"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary'
import CartItem from './components/cart-item';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">עגלה</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">לא נוספו פריטים לעגלה.</p>}
              <ul>

                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} ProductSize={item.ProductSize} orderSize={''} orderQuantity={0} productSizes={[]} id={''} category={item.category} name={''} price={''} salePrice={''} isFeatured={false} size={item.size} color={item.color} images={[]}  descriptionHeader={''} description={''} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
};


export default CartPage;
