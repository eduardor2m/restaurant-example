/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICart } from '../types/cart';

interface ICartContextData {
  cart: ICart[];
  addCart: (Cart: ICart) => Promise<void | Error>;
  listCart: () => Promise<ICart[] | null>;
  deleteCart: () => Promise<void>;
  setTable: (table?: number) => void;
  setQuantity: (id: string, type: 'sum' | 'sub') => void;
  deleteItemCart: (id: string) => void;
}

interface ICartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<ICartContextData>({} as ICartContextData);

export function CartProvider({ children }: ICartProviderProps) {
  const [cart, setCart] = useState<ICart[]>([]);
  const key = '@EspetoGaucho:cart';

  useEffect(() => {
    listCart();
  }, []);

  async function addCart(data: ICart) {
    try {
      if (cart.map((item) => item.id).includes(data.id)) {
        setQuantity(data.id, 'sum');
      } else {
        const cartToSave = [...cart, data];

        setCart(cartToSave);

        localStorage.setItem(key, JSON.stringify(cartToSave));
      }
    } catch (error) {
      return new Error('Erro ao adicionar produto ao carrinho');
    }
  }

  async function listCart() {
    const cartList = localStorage.getItem(key);

    if (cartList) {
      const cartToJson = JSON.parse(cartList);

      const cartFormatted = cartToJson.map((item: ICart) => {
        return {
          ...item,
          quantity: Number(item.quantity),
        };
      });

      setCart(cartFormatted);

      return cartFormatted;
    } else {
      return null;
    }
  }

  async function deleteItemCart(id: string) {
    const cartFiltered = cart.filter((item) => item.id !== id);

    setCart(cartFiltered);

    localStorage.setItem(key, JSON.stringify(cartFiltered));
  }

  async function deleteCart() {
    localStorage.removeItem(key);

    setCart([]);
  }

  async function setQuantity(id: string, type: 'sum' | 'sub') {
    const cartList = localStorage.getItem(key);

    if (cartList) {
      const cartFormatted: ICart[] = JSON.parse(cartList);

      cartFormatted.map((item: ICart) => {
        if (item.id === id) {
          if (type === 'sum') {
            item.quantity += 1;
          } else if (type === 'sub' && item.quantity > 1) {
            item.quantity -= 1;
          }
        }
      });

      setCart(cartFormatted);
      localStorage.setItem(key, JSON.stringify(cartFormatted));
    }
  }

  async function setTable(table?: number) {
    if (table) {
      localStorage.setItem('@EspetoGaucho:table', JSON.stringify(table));
    } else {
      localStorage.removeItem('@EspetoGaucho:table');
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        listCart,
        setTable,
        deleteCart,
        setQuantity,
        deleteItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): ICartContextData {
  const context = useContext(CartContext);

  return context;
}
