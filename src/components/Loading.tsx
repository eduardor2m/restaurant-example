import { BoxLoading } from 'react-loadingg';

import styles from '../styles/components/Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <BoxLoading color="#34CB79" size="large" type="cylon" />
    </div>
  );
};
