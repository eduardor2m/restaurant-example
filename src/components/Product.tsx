import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { useCart } from '@/hooks/useCart';
import { useFavorite } from '@/hooks/useFavorite';
import styles from '@/styles/components/Product.module.scss';
import { IProduct } from '@/types/product';
import Image from 'next/image';

import { AlertCard } from './AlertCard';

interface IProductProps {
  data: IProduct;
}

export const Product = ({ data }: IProductProps) => {
  const { addCart } = useCart();
  const { addFavorite, favorite } = useFavorite();

  const [showAlert, setShowAlert] = useState({
    title: '',
    status: false,
  });

  return (
    <div className={styles.product}>
      {showAlert.status && (
        <AlertCard
          title={showAlert.title}
          handleAction={() => setShowAlert({ title: '', status: false })}
        />
      )}

      <div className={styles.product_favorite}>
        {favorite.find((item) => item.id === data.id) ? (
          <AiFillHeart size={20} color="#FF0000" />
        ) : (
          <AiOutlineHeart
            size={20}
            onClick={() => {
              addFavorite(data)
                .then(() =>
                  setShowAlert({
                    title: 'Adicionado ao carrinho',
                    status: true,
                  })
                )
                .catch(() =>
                  setShowAlert({ title: 'Erro ao adicionar', status: true })
                );
            }}
          />
        )}
      </div>
      <div className={styles.product_image}>
        <Image
          src={data.image}
          alt="Imagem do Produto"
          width={50}
          height={50}
          style={{
            borderRadius: '10px',
          }}
        />
      </div>
      <div className={styles.product_content}>
        <div className={styles.product_content_title}>
          <h2>{data.name}</h2>
        </div>
        <div className={styles.product_content_description}>
          <p>
            {data.description.length > 100
              ? data.description.substring(0, 60) + '...'
              : data.description}
          </p>
        </div>
        <div className={styles.product_content_wrapper}>
          <div className={styles.product_content_price}>
            <p className={styles.product_content_measure}>{data.measure}</p>
            <p>{data.priceFormatted ? data.priceFormatted : data.price}</p>
          </div>
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
                  .then(() =>
                    setShowAlert({
                      title: 'Adicionado ao carrinho',
                      status: true,
                    })
                  )

                  .catch(() =>
                    setShowAlert({ title: 'Erro ao adicionar', status: true })
                  )
              }
            >
              <HiOutlineShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
