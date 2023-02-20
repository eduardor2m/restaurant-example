/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineHeart,
} from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { useCart } from '@/hooks/useCart';
import { useFavorite } from '@/hooks/useFavorite';
import styles from '@/styles/components/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AlertCardOptions } from './AlertCardOptions';
import { Loading } from './Loading';

interface IHeaderProps {
  title: string;
  omitIcon?: boolean;
  cart?: boolean;
  favorite?: boolean;
  home?: boolean;
  url?: string;
  checkout?: boolean;
}

export const Header = ({
  title,
  omitIcon,
  cart,
  url,
  favorite,
  home,
  checkout,
}: IHeaderProps) => {
  const router = useRouter();
  const { deleteFavorite } = useFavorite();
  const { deleteCart } = useCart();

  const [showAlert, setShowAlert] = useState({
    title: '',
    status: false,
    handleDelete: () => {},
    handleCancel: () => {},
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      {showAlert.status && (
        <AlertCardOptions
          title={showAlert.title}
          handleDelete={showAlert.handleDelete}
          handleCancel={showAlert.handleCancel}
        />
      )}
      {loading && <Loading />}

      <div className={styles.header}>
        {home === false || home === undefined ? (
          <Link
            href={url === undefined ? '/' : url}
            onClick={() => {
              setLoading(true);
            }}
          >
            <div
              className={
                omitIcon === false
                  ? styles.header_icon
                  : styles.header_icon_omit
              }
            >
              {omitIcon === false ? (
                <AiOutlineArrowLeft
                  size={22}
                  className={styles.icon}
                  color="#06d6a0"
                />
              ) : (
                <div />
              )}
            </div>
          </Link>
        ) : (
          <div
            className={styles.header_icon}
            onClick={() => {
              setLoading(true);
              router.push('/favorites');
            }}
          >
            <AiOutlineHeart size={22} className={styles.icon} color="#ef233c" />
          </div>
        )}

        <div className={styles.header_title}>
          {title === 'Espeto Gaucho' ? (
            <div
              className={styles.header_title_image}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              onClick={() => (setLoading(true), router.push('/login'))}
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={35}
                height={35}
                style={{
                  borderRadius: '50%',
                  marginRight: '10px',
                  border: '1px solid #fff',
                }}
              />

              <p
                className={styles.header_title_text}
                style={{
                  color: '#343a40',
                  fontSize: '20px',
                }}
              >
                {title}
              </p>
            </div>
          ) : (
            <h1 className={styles.header_title_text}>{title}</h1>
          )}
        </div>
        {checkout === true && <div className={styles.header_icon_omit} />}

        {home === false || home === undefined ? null : (
          <div
            className={styles.header_icon}
            onClick={() => {
              setLoading(true);
              router.push('/cart');
            }}
          >
            <HiOutlineShoppingCart size={22} className={styles.icon} />
          </div>
        )}
        {cart === false || cart === undefined ? null : (
          <div
            className={styles.header_icon}
            onClick={() => {
              setShowAlert({
                title: 'Deseja deletar todos os produtos do carrinho?',
                status: true,
                handleDelete: () => {
                  deleteCart().then(() => {
                    setShowAlert({
                      title: '',
                      status: false,
                      handleCancel: () => {},
                      handleDelete: () => {},
                    });
                  });
                },
                handleCancel: () => {
                  setShowAlert({
                    title: '',
                    status: false,
                    handleCancel: () => {},
                    handleDelete: () => {},
                  });
                },
              });
            }}
          >
            <AiOutlineDelete
              size={22}
              className={styles.icon}
              color="#ef233c"
            />
          </div>
        )}

        {favorite === false || favorite === undefined ? null : (
          <div
            className={styles.header_icon}
            onClick={() => {
              setShowAlert({
                title: 'Deseja deletar esse produto dos favoritos?',
                status: true,
                handleDelete: () => {
                  deleteFavorite().then(() => {
                    setShowAlert({
                      title: '',
                      status: false,
                      handleCancel: () => {},
                      handleDelete: () => {},
                    });
                  });
                },
                handleCancel: () => {
                  setShowAlert({
                    title: '',
                    status: false,
                    handleCancel: () => {},
                    handleDelete: () => {},
                  });
                },
              });
            }}
          >
            <AiOutlineDelete
              size={22}
              className={styles.icon}
              color="#ef233c"
            />
          </div>
        )}
      </div>
    </div>
  );
};
