import PageSidebar from '@/components/page-sidebar/page-sidebar';
import styles from './base.module.scss';
import React, { FunctionComponent } from 'react';
import PageLoader from '@/components/page-loader/page-loader';

import { useAppContext } from '@/app-context';
import {Outlet} from "react-router-dom";

export interface BaseLayoutProps {
  children?: React.ReactNode;
}

const BaseLayout: FunctionComponent<BaseLayoutProps> = ({ children }) => {
  const { logo, title, loading } = useAppContext();

  return (
    <div className={styles.layoutBase}>
      <PageLoader loading={loading}>
        <aside className={styles.layoutBase__aside}>
          <PageSidebar title={title} logo={logo} />
        </aside>
        <main className={styles.layoutBase__main}>
          <Outlet />
          {children}
        </main>
      </PageLoader>
    </div>
  );
};

export default BaseLayout;
