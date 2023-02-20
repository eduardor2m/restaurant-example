import { useFavorite } from '@/hooks/useFavorite';
import type { NextPage } from 'next';
import Head from 'next/head';

import { CartItem } from '../components/CartItem';
import { Header } from '../components/Header';
import styles from '../styles/pages/Cart.module.scss';

const Favorites: NextPage = () => {
  const { favorite, deleteItemFavorite } = useFavorite();

  return (
    <div className={styles.container}>
      <Head>
        <title>Favoritos</title>
        <meta name="description" content="Produtos Favoritos" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main className={styles.main}>
        <Header title="Favoritos" omitIcon={false} favorite={true} />
        <section className={styles.cart}>
          <section className={styles.products}>
            {favorite ? (
              favorite.map((favorite) => (
                <CartItem
                  key={favorite.id}
                  data={favorite}
                  favorite={true}
                  onClick={() => {
                    deleteItemFavorite(favorite.id);
                  }}
                />
              ))
            ) : (
              <section className={styles.emptyCart}>
                <h1>Carrinho Vazio</h1>

                <p>Adicione produtos ao carrinho para ver os itens aqui.</p>
              </section>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};

export default Favorites;
