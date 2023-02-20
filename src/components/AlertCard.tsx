import styles from '../styles/components/AlertCard.module.scss';

interface IAlertCard {
  title: string;
  handleAction?: () => void;
}

export const AlertCard = ({ title, handleAction }: IAlertCard) => {
  return (
    <section className={styles.content}>
      <div className={styles.alert}>
        <h1>{title}</h1>
        <section className={styles.alert_button}>
          <button className={styles.alert_button_action} onClick={handleAction}>
            Ok
          </button>
        </section>
      </div>
    </section>
  );
};
