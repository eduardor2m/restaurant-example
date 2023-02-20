import { useState } from 'react';
import { BsFillCartCheckFill } from 'react-icons/bs';

import styles from '../styles/components/CartInformation.module.scss';
import { DecisionCard } from './DecisionCard';

interface ICartItemProps {
  price: number;
}

export const CartInformation = ({ price }: ICartItemProps) => {
  const [decisionShow, setDecisionShow] = useState(false);

  function formatPrice(price: number) {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function taxTotal() {
    return price + 5;
  }

  return (
    <nav className={styles.cart_information}>
      {decisionShow && (
        <DecisionCard
          onClick={() => {
            setDecisionShow(false);
          }}
        />
      )}
      <section className={styles.main}>
        <section className={styles.total}>
          <section className={styles.total_price}>
            <h1 className={styles.total_text}>SubTotal</h1>
            <h1 className={styles.total_value}>
              {price ? formatPrice(price) : formatPrice(0)}
            </h1>
          </section>
          <section className={styles.total_price}>
            <h1 className={styles.total_text}>Frete</h1>
            <h1 className={styles.total_value}>R$ 5.00</h1>
          </section>
          <section className={styles.total_price}>
            <h1 className={styles.total_text}>Total</h1>
            <h1 className={styles.total_value}>
              {price ? formatPrice(taxTotal()) : formatPrice(0)}
            </h1>
          </section>
        </section>
        <section className={styles.addCart}>
          <button
            onClick={() => {
              setDecisionShow(true);
            }}
          >
            <section className={styles.addCartContent}>
              <section className={styles.addCartContentIcon}>
                <section className={styles.wrapperAddCartContentIcon}>
                  <BsFillCartCheckFill size={22} color="#fff" />
                </section>
              </section>
              <section className={styles.addCartContentText}>
                <p>Finalizar Pedido</p>
              </section>
              <section className={styles.addCartContentPrice}>
                <section className={styles.wrapperAddCartContentPrice}>
                  <p>{price ? formatPrice(taxTotal()) : formatPrice(0)}</p>
                </section>
              </section>
            </section>
          </button>
        </section>
      </section>
    </nav>
  );
};
