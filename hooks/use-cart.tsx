import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product, ProductSize } from '@/types';
import { AlertTriangle } from 'lucide-react';

export interface CartOrder  extends Product {
  orderQuantity: number;
  ProductSize: ProductSize;
  orderSize : string;
  
}

interface CartStore {
  items: CartOrder[];
  addItem: (data: CartOrder) => void;
  removeItem: (id: string, orderSize?: string) => void;
  removeAll: () => void;
  incrementQuantity: (id: string, orderSize: string) => void;
  decrementQuantity: (id: string, orderSize: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (order: CartOrder) => {
        const currentItems = get().items;

        const existingItem = currentItems.find(
          (item) => item.id === order.id && item.orderSize === order.orderSize
        );

        if (existingItem) {
          const sizeStock = order.ProductSize.quantity;
          const availableStock = sizeStock - existingItem.orderQuantity;

          if (availableStock >= order.orderQuantity) {
            existingItem.orderQuantity += order.orderQuantity;
            set({ items: [...currentItems] });
            toast.success(`${order.orderQuantity} מהמוצר נוסף לעגלה`);
          } else if (availableStock > 0) {
            existingItem.orderQuantity += availableStock;
            set({ items: [...currentItems] });
            toast.success(`כמות מקסימלית של ${availableStock} מהמוצר נוספה לעגלה`);
          } else {
            toast.error(`מהמוצר ${order.name} לא נותר במלאי`);
          }
        } else {
          set({ items: [...currentItems, order] });
          toast.success(`${order.orderQuantity} מהמוצר נוסף לעגלה`);
        }
      },

      
      removeItem: (id: string, orderSize?: string) => {
        const currentItems = get().items;

        if (orderSize) {
          // If orderSize is provided, remove the item with the matching id and orderSize
          set({ items: [...currentItems.filter((item) => !(item.id === id && item.orderSize === orderSize))] });
        } else {
          // If no orderSize is provided, remove all items with the matching id
          set({ items: [...currentItems.filter((item) => item.id !== id)] });
        }

        toast.success(`הוסר מהעגלה`);
      },

      removeAll: () => set({ items: [] }),

      incrementQuantity: (id: string, orderSize: string) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id && item.orderSize === orderSize) {
            return { ...item, orderQuantity: item.orderQuantity + 1 };
          }
          return item;
        });
        set({ items: updatedItems });
      },
      
      decrementQuantity: (id: string, orderSize: string) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id && item.orderSize === orderSize && item.orderQuantity > 1) {
            return { ...item, orderQuantity: item.orderQuantity - 1 };
          }
          return item;
        });
        set({ items: updatedItems });
      },

    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);


export default useCart;
