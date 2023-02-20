import { useProduct } from '@/hooks/useProduct';
import Image from 'next/image';

import styles from '../styles/components/CardUpdate.module.scss';

interface ICardDeleteProps {
  data: {
    id: string;
    name: string;
    category: string;
    price: number;
    measure: string;
    image: string;
    description: string;
    priceFormatted?: string;
  };
}

export const CardUpdate = ({ data }: ICardDeleteProps) => {
  const { del } = useProduct();

  return (
    <>
      <section
        className={styles.product}
        style={{
          marginBottom: '10px',
          borderRadius: '8px',
        }}
      >
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
                <p>20 min</p>
                <p>1kg</p>
              </section>
              <h3>{data.priceFormatted ? data.priceFormatted : data.price}</h3>
            </section>
          </section>
        </section>
        <section
          className={styles.footer}
          style={{
            borderRadius: '8px',
          }}
          onClick={() => del(data.id)}
        >
          Deletar
        </section>
      </section>
    </>
  );
};
