import { CartProvider } from '@/hooks/useCart';
import { FavoriteProvider } from '@/hooks/useFavorite';
import { ProductProvider } from '@/hooks/useProduct';
import { UserProvider } from '@/hooks/useUser';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <FavoriteProvider>
        <UserProvider>
          <ProductProvider>
            <Component {...pageProps} />
          </ProductProvider>
        </UserProvider>
      </FavoriteProvider>
    </CartProvider>
  );
}
