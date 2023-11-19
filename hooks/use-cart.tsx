import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

export interface CartOrder  extends Product {
  orderQuantity: number;
}

interface CartStore {
  items: CartOrder[];
  addItem: (data: CartOrder) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartOrder) => {
        const currentItems: CartOrder[] = get().items;
        const existingItem: CartOrder| undefined = currentItems.find((item) => item.id === data.id);
        const availableStock: number = data.quantity - (existingItem ? existingItem.orderQuantity : 0);


        if (existingItem) {
          if (availableStock >= data.orderQuantity) {
            existingItem.orderQuantity += data.orderQuantity;
            set({ items: [...currentItems] });
            toast.success(`מהמוצר ${data.orderQuantity} נוסף לעגלה`);
          } else if (availableStock > 0) {
            existingItem.orderQuantity += availableStock;
            set({ items: [...currentItems] });
            toast.success(`מהמוצר, לא קיים עוד במלאי ${availableStock} נוסף לעגלה`);
          } else {
            toast.error(`מהמוצר ${data.name} לא קיים במלאי`);
          }
        } else {
          set ({ items: [...currentItems, data] });
          toast.success(`מהמוצר ${data.name} נוסף לעגלה`);
        }
      },
      removeItem: (id: string) => {
        set ({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success(`מהמוצר הוסר מהעגלה`);
      }, 
      removeAll: () => set({ items: [] }),

      incrementQuantity: (id: string) => {
        const updatedItems = get().items.map(item => {
          if (item.id === id) {
            return { ...item, orderQuantity: item.orderQuantity + 1 };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      decrementQuantity: (id: string) => {
        const updatedItems = get().items.map(item => {
          if (item.id === id && item.orderQuantity > 1) {
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
