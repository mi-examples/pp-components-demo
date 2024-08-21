import React from 'react';
import clsx from 'clsx';

import styles from './page-search.module.scss';

export interface PageSearchNoResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  noResultsText?: string;
}

const PageSearchNoResults: React.FunctionComponent<PageSearchNoResultsProps> = ({
  children,
  noResultsText = 'No results found',
  className,
  ...rest
}) => {
  return (
    <div className={clsx(className, styles.pageSearchNoResults)} {...rest}>
      {children}
      <div className={styles.pageSearchNoResults__caption}>{noResultsText}</div>
    </div>
  );
};

export default PageSearchNoResults;
