import { useState } from 'react';

import { useRouter } from 'next/router';

import styles from '../styles/components/DecisionCard.module.scss';
import { Loading } from './Loading';
import { TableCard } from './TableCard';

interface DecisionCardProps {
  onClick?: () => void;
}

export const DecisionCard = ({ onClick }: DecisionCardProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [tableShow, setTableShow] = useState(false);
  return (
    <section
      className={styles.content}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {loading && <Loading />}
      {tableShow && (
        <TableCard
          onClick={() => {
            setTableShow(false);
          }}
        />
      )}
      <div
        className={styles.decision}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Vai consumir no local ou é para entrega?</h1>
        <section className={styles.decision_buttons}>
          <button
            className={styles.decision_button_action}
            onClick={() => {
              setLoading(true);
              router.push('/checkout');
            }}
          >
            Entrega
          </button>
          <button
            className={styles.decision_button_action}
            onClick={() => {
              setTableShow(true);
            }}
          >
            Local
          </button>
        </section>
      </div>
    </section>
  );
};
