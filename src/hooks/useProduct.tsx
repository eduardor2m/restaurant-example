/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { IProduct } from '../types/product';

interface IProductContextData {
  products: IProduct[];
  create: (Product: IProduct) => Promise<void>;
  list: () => Promise<IProduct[] | null>;
  del: (id: string) => Promise<void>;
}

interface IProductProviderProps {
  children: ReactNode;
}

const productContext = createContext<IProductContextData>(
  {} as IProductContextData
);

export function ProductProvider({ children }: IProductProviderProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    list();
  }, []);

  async function create(product: IProduct) {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_DEVELOPING === 'true'
          ? `${process.env.NEXT_PUBLIC_URL}/api/products`
          : `https://espeto-gaucho.vercel.app/api/products`,
        {
          ...product,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch {
      throw new Error('Erro ao criar produto');
    }
  }

  async function list() {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_DEVELOPING === 'true'
        ? `${process.env.NEXT_PUBLIC_URL}/api/products`
        : `https://espeto-gaucho.vercel.app/api/products`
    );

    const productsList = data.map((product: IProduct) => {
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        measure: product.measure,
        priceFormatted: product.priceFormatted,
      } as IProduct;
    });

    if (productsList) {
      setProducts(productsList);

      return productsList;
    } else {
      return null;
    }
  }

  async function del(id: string) {
    await axios
      .delete(
        process.env.NEXT_PUBLIC_DEVELOPING === 'true'
          ? `${process.env.NEXT_PUBLIC_URL}/api/product/${id}`
          : `https://espeto-gaucho.vercel.app/api/product/${id}`
      )
      .then(({ data }) => {
        setProducts(data);
        alert('Produto deletado com sucesso!');
      })
      .catch(() => {
        alert('Erro ao deletar produto!');
      });

    return;
  }

  return (
    <productContext.Provider
      value={{
        products,
        create,
        list,
        del,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export function useProduct(): IProductContextData {
  const context = useContext(productContext);

  return context;
}
