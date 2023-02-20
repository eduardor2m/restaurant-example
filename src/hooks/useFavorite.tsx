/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IFavorite } from '../types/favorite';

interface IFavoriteContextData {
  favorite: IFavorite[];
  addFavorite: (Cart: IFavorite) => Promise<void | Error>;
  listFavorite: () => Promise<IFavorite[] | null>;
  deleteFavorite: () => Promise<void>;
  deleteItemFavorite: (id: string) => void;
}

interface IFavoriteProviderProps {
  children: ReactNode;
}

const FavoriteContext = createContext<IFavoriteContextData>(
  {} as IFavoriteContextData
);

export function FavoriteProvider({ children }: IFavoriteProviderProps) {
  const [favorite, setFavorite] = useState<IFavorite[]>([]);
  const key = '@EspetoGaucho:favorite';

  useEffect(() => {
    listFavorite();
  }, []);

  async function addFavorite(data: IFavorite) {
    try {
      const favoriteToSave = [...favorite, data];

      setFavorite(favoriteToSave);

      localStorage.setItem(key, JSON.stringify(favoriteToSave));
    } catch (error) {
      return new Error('Erro ao adicionar produto aos favoritos');
    }
  }

  async function listFavorite() {
    const cartList = localStorage.getItem(key);

    if (cartList) {
      const cartFormatted = JSON.parse(cartList);

      setFavorite(cartFormatted);

      return cartFormatted;
    } else {
      return null;
    }
  }

  async function deleteItemFavorite(id: string) {
    const cartFiltered = favorite.filter((item) => item.id !== id);

    setFavorite(cartFiltered);

    localStorage.setItem(key, JSON.stringify(cartFiltered));
  }

  async function deleteFavorite() {
    localStorage.removeItem(key);

    setFavorite([]);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        addFavorite,
        listFavorite,
        deleteFavorite,
        deleteItemFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite(): IFavoriteContextData {
  const context = useContext(FavoriteContext);

  return context;
}
