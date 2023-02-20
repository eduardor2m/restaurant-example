/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICart } from '@/types/cart';
import { IUser } from '@/types/user';
import { setCookie, deleteCookie } from 'cookies-next';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { IOrder } from '../types/order';

interface IUserContextData {
  user: IUser;
  createAccount: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  order: ({
    name,
    street,
    number,
    complement,
    neighborhood,
    reference,
    formPayment,
    cart,
  }: IOrder) => Promise<void>;
}

interface IUserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContextData>({} as IUserContextData);

export function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const userCookieKey = '@EspetoGaucho:user';
  const orderCookieKey = '@EspetoGaucho:order';
  const userKey = '@EspetoGaucho:user';

  async function userInStorage() {
    const userStorage = await localStorage.getItem(userCookieKey);

    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }

  useEffect(() => {
    userInStorage();
  }, []);

  async function createAccount(email: string, password: string) {
    const passwordHash = password;

    await createUserWithEmailAndPassword(auth, email, passwordHash)
      .then((userCredential: any) => {
        const { uid } = userCredential.user;

        const user = {
          id: uid,
          email,
          password: passwordHash,
        };

        setUser(user);
        setCookie(userKey, JSON.stringify(user));
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  async function login(email: string, password: string) {
    const passwordHash = password;

    await signInWithEmailAndPassword(auth, email, passwordHash)
      .then((userCredential: any) => {
        const { uid } = userCredential.user;

        const user = {
          id: uid,
          email,
          password: passwordHash,
        };

        setUser(user);
        setCookie(userCookieKey, JSON.stringify(user));
      })
      .catch(() => {
        throw new Error('Email ou senha incorretos');
      });
  }

  async function logout() {
    try {
      setUser({} as IUser);
      deleteCookie(userCookieKey);
    } catch {
      throw new Error('Erro ao sair');
    }
  }

  async function order({
    name,
    street,
    number,
    complement,
    neighborhood,
    reference,
    formPayment,
    cart,
  }: IOrder) {
    try {
      const table = localStorage.getItem('@EspetoGaucho:table');

      if (table) {
        const cartFormatted = cart.map((item: ICart) => {
          return `${item.name} - ${item.quantity} unidade(s)`;
        });

        const total = cart.reduce((acc: number, item: ICart) => {
          return acc + item.price * item.quantity;
        }, 0);

        const message = `Olá, gostaria de fazer um pedido com os seguintes itens: ${cartFormatted.join(
          ', '
        )}, Total: R$ ${(total + 5).toFixed(2)}, Mesa: ${table}`;

        const api = `https://api.whatsapp.com/send?phone=+5582982017899&text=${message}`;
        window.open(api);
      } else {
        if (!name || !street || !number || !neighborhood || !formPayment) {
          alert('Preencha todos os campos');
          return;
        }

        let paymentFormated = '';

        if (formPayment === 'money') {
          paymentFormated = 'Dinheiro';
        } else if (formPayment === 'credit') {
          paymentFormated = 'Cartão de Crédito';
        } else if (formPayment === 'pix') {
          paymentFormated = 'Pix';
        }

        setCookie(
          orderCookieKey,
          JSON.stringify({
            name,
            street,
            number,
            complement,
            neighborhood,
            reference,
            formPayment,
          })
        );

        const cartFormatted = cart.map((item: ICart) => {
          return `${item.name} - ${item.quantity} unidade(s)`;
        });

        const total = cart.reduce((acc: number, item: ICart) => {
          return acc + item.price * item.quantity;
        }, 0);

        const message = `Olá, gostaria de fazer um pedido com os seguintes itens: ${cartFormatted.join(
          ', '
        )}, Total: R$ ${(total + 5).toFixed(
          2
        )}, Endereço: ${street}, Número: ${number}, Complemento: ${complement}, Bairro: ${neighborhood}, Referência: ${reference}, Forma de pagamento: ${paymentFormated}, Nome: ${name}, Mesa: ${table}`;

        const api = `https://api.whatsapp.com/send?phone=+5582982017899&text=${message}`;
        window.open(api);
      }
    } catch {
      throw new Error('Erro ao fazer pedido');
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createAccount,
        login,
        logout,
        order,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): IUserContextData {
  const context = useContext(UserContext);

  return context;
}
