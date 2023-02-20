import { useCart } from '@/hooks/useCart';
import { useUser } from '@/hooks/useUser';

import styles from '../styles/components/TableCard.module.scss';

interface TableCardProps {
  onClick?: () => void;
}

export const TableCard = ({ onClick }: TableCardProps) => {
  const { setTable, cart } = useCart();
  const { order } = useUser();

  return (
    <section
      className={styles.content}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div
        className={styles.table}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Digite o número da sua mesa</h1>
        <section className={styles.table_input}>
          <input
            type="text"
            placeholder="Ex: 1"
            onChange={(e) => {
              setTable(Number(e.target.value));
            }}
          />
        </section>
        <section className={styles.table_buttons}>
          <button
            className={styles.table_button_action}
            onClick={() => {
              onClick && onClick();
            }}
          >
            Cancelar
          </button>
          <button
            className={styles.table_button_action}
            onClick={() => {
              order({
                cart,
              });
            }}
          >
            Pedir
          </button>
        </section>
      </div>
    </section>
  );
};
