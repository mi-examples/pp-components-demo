import { FunctionComponent } from 'react';
import { Search } from '@metricinsights/pp-components';
import { useAppContext } from '@/app-context';

import SearchIcon from '@/assets/img/icon-search.svg';

import styles from './page-search.module.scss';
import { ReactSVG } from 'react-svg';

export interface PageSearchProps {}

const PageSearch: FunctionComponent<PageSearchProps> = () => {
  const { search, setSearch } = useAppContext();

  const handleSearch = (searchInput: string) => {
    setSearch(searchInput);
  };

  return (
    <div className={styles.pageSearch}>
      <ReactSVG src={SearchIcon} className={styles.pageSearch__icon} />
      <Search handleSearch={handleSearch} debounceTime={1000} placeholder={'Search'} initialValue={search} />
    </div>
  );
};

export default PageSearch;
