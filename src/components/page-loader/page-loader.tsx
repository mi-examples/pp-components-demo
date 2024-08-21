import React, { FunctionComponent } from 'react';
import { Preloader } from '@metricinsights/pp-components';

import styles from './page-loader.module.scss';

export interface PageLoaderProps {
  loading?: boolean;
  children?: React.ReactNode;
  loaderSrc?: string;
}

const PageLoader: FunctionComponent<PageLoaderProps> = ({ loading = false, children, loaderSrc }) => {
  return <>{loading ? <Preloader src={loaderSrc} className={styles.pageLoader__loader} /> : children}</>;
};

export default PageLoader;
