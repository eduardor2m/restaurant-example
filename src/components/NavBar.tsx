/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import styles from '@/styles/components/NavBar.module.scss';
import { useRouter } from 'next/router';

import { AlertCard } from './AlertCard';
import { Loading } from './Loading';

interface IHeaderProps {
  title: string;
}

export const NavBar = ({ title }: IHeaderProps) => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState({
    title: '',
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  const hour = new Date().getHours();

  return (
    <div
      className={styles.container}
      style={{
        height: scroll ? '90px' : '230px',
      }}
    >
      {showAlert.status && (
        <AlertCard
          title={showAlert.title}
          handleAction={() => setShowAlert({ title: '', status: false })}
        />
      )}
      {loading && <Loading />}

      <div className={styles.header}>
        <div
          className={styles.header_icon}
          onClick={() => {
            setLoading(true);
            router.push('/favorites');
          }}
        >
          <AiOutlineHeart size={22} className={styles.icon} color="#ef233c" />
        </div>

        <div
          className={styles.header_title}
          onClick={() => {
            setLoading(true);
            router.push('/login');
          }}
        >
          <p className={styles.header_title_text}>{title}</p>
        </div>

        <div
          className={styles.header_icon}
          onClick={() => {
            setLoading(true);
            router.push('/cart');
          }}
        >
          <HiOutlineShoppingCart
            size={22}
            className={styles.icon}
            color="#06d6a0"
          />
        </div>
      </div>
      {scroll ? null : (
        <div className={styles.content}>
          <div className={styles.content_title}>
            <p className={styles.content_title_text}>
              Olá, <br />
              {hour >= 6 && hour < 12
                ? 'Bom dia'
                : hour >= 12 && hour < 18
                ? 'Boa tarde'
                : 'Boa noite'}
            </p>
          </div>
          <div className={styles.content_subtitle}>
            <p className={styles.content_subtitle_text}>
              Pedidos no local ou para entrega
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
