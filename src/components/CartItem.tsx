/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';

import styles from '../styles/components/CartItem.module.scss';

interface ICartItemProps {
  data: {
    id: string;
    name: string;
    category: string;
    price: number;
    measure: string;
    image: string;
    description: string;
    quantity?: number;
    priceFormatted?: string;
  };
  favorite?: boolean;
  onClick?: () => void;
}

export const CartItem = ({ data, onClick, favorite }: ICartItemProps) => {
  const { addCart, setQuantity } = useCart();
  return (
    <section className={styles.product}>
      <section className={styles.product_main}>
        <section className={styles.product_image}>
          <Image
            src={data.image}
            width={100}
            height={100}
            style={{
              borderRadius: '10px',
            }}
            priority
            alt="Imagem do Produto"
          />
        </section>
        <section className={styles.product_info}>
          <h1>{data.name}</h1>
          <section className={styles.product_infoDetail}>
            <section className={styles.product_detail}>
              <p>{data.category}</p>
            </section>
            <h3>{data.priceFormatted ? data.priceFormatted : data.price}</h3>
          </section>
        </section>
      </section>
      <section className={styles.footer}>
        <button
          type="button"
          onClick={onClick}
          className={styles.delete_button}
        >
          <AiOutlineDelete size={20} color="#fff" />
        </button>
        {favorite ? (
          <div className={styles.product_content_button}>
            <button
              onClick={() =>
                addCart({
                  id: data.id,
                  name: data.name,
                  category: data.category,
                  price: data.price,
                  image: data.image,
                  description: data.description,
                  measure: data.measure,
                  quantity: 1,
                })
              }
            >
              <HiOutlineShoppingCart size={18} />
            </button>
          </div>
        ) : (
          <section className={styles.quantity}>
            <button
              type="button"
              className={styles.quantity_button}
              onClick={() => {
                setQuantity(data.id, 'sum');
              }}
            >
              <p> + </p>
            </button>
            <p>{data.quantity}</p>
            <button
              type="button"
              className={styles.quantity_button}
              onClick={() => {
                setQuantity(data.id, 'sub');
              }}
            >
              <p> - </p>
            </button>
          </section>
        )}
      </section>
    </section>
  );
};
