import styles from './index.less';
import useServiceWorker from '@/hooks/useServiceWorker';

export default function IndexPage() {
  useServiceWorker()

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
