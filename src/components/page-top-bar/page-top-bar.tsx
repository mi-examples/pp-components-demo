import PageThemeControls from '@/components/page-theme-controls/page-theme-controls';
import PageSearch from '@/components/page-search/page-search';

import styles from './page-top-bar.module.scss';

const PageTopBar = () => {
  return (
    <div className={styles.top}>
      <PageSearch />
      <PageThemeControls />
    </div>
  );
};

export default PageTopBar;
