import styles from '../styles/components/AlertCardOptions.module.scss';

interface IAlertCard {
  title: string;
  handleDelete?: () => void;
  handleCancel?: () => void;
}

export const AlertCardOptions = ({
  title,
  handleDelete,
  handleCancel,
}: IAlertCard) => {
  return (
    <section className={styles.content}>
      <div className={styles.alert}>
        <h1>{title}</h1>
        <section className={styles.alert_buttons}>
          <button
            className={styles.alert_buttons_cancel}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className={styles.alert_buttons_confirm}
            onClick={handleDelete}
          >
            Excluir
          </button>
        </section>
      </div>
    </section>
  );
};
