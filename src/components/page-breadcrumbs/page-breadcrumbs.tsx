import { FunctionComponent, MouseEventHandler } from 'react';
import { Breadcrumbs } from '@metricinsights/pp-components';
import { buildBreadcrumbs } from '@/helpers/breadcrumbs.helper';
import { FolderExtended } from '@/helpers/folders.helper';
import { useNavigate } from 'react-router-dom';

import styles from './page-breadcrumbs.module.scss';

export interface PageBreadcrumbsProps {
  folder: FolderExtended;
}

const PageBreadcrumbs: FunctionComponent<PageBreadcrumbsProps> = ({ folder }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageBreadcrumbs}>
      {folder ? (
        <Breadcrumbs
          crumbs={buildBreadcrumbs(folder)}
          onClick={
            ((e) => {
              e.preventDefault();

              let href = e.currentTarget.getAttribute('href') ?? '';

              if (!href.startsWith('/')) {
                href = `/${href}`;
              }

              navigate(href);
            }) as MouseEventHandler<HTMLAnchorElement> as any
          }
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default PageBreadcrumbs;
