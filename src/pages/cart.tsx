import { useCart } from '@/hooks/useCart';
import type { NextPage } from 'next';
import Head from 'next/head';

import { CartInformation } from '../components/CartInformation';
import { CartItem } from '../components/CartItem';
import { Header } from '../components/Header';
import styles from '../styles/pages/Cart.module.scss';

const Cart: NextPage = () => {
  const { cart, deleteItemCart } = useCart();

  function totalPrice() {
    const totalPrice = cart.reduce((acc, product) => {
      const value = acc + product.price * product.quantity;
      value.toFixed(2);
      return value;
    }, 0);

    return totalPrice;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Carrinho de Compras" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <main className={styles.main}>
        <Header title="Carrinho" omitIcon={false} cart={true} />
        <section className={styles.cart}>
          <section className={styles.products}>
            {cart ? (
              cart.map((product) => (
                <CartItem
                  key={product.id}
                  data={product}
                  onClick={() => {
                    deleteItemCart(product.id);
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
        <CartInformation price={totalPrice()} />
      </main>
    </div>
  );
};

export default Cart;
