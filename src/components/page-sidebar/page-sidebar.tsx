import { FunctionComponent, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, SidebarCustomItem, SidebarItemEvent, SidebarNavItem } from '@metricinsights/pp-components';
import clsx from 'clsx';
import { ReactSVG } from 'react-svg';

import { useAppContext } from '@/app-context';
import { PP_CONSTANTS } from '@/constants';

import SidebarMenuIcon from '@/assets/img/icon-sidebar-menu.svg';
import HomeIcon from '@/assets/img/icon-home.svg';
import FavoriteIcon from '@/assets/img/icon-favorite.svg';

import styles from './page-sidebar.module.scss';

export interface PageSidebarProps {
  logo?: string;
  title?: string;
}

type SidebarHeaderComponentProps = {
  handleClick: () => void;
};

// type ActiveItem = {
//   id: string;
//   name: string;
// };

const SidebarHeaderComponent: FunctionComponent<SidebarHeaderComponentProps> = (props) => {
  const { handleClick } = props;
  const logo = useAppContext().logo;

  return (
    <div className={styles.pageSidebar__header}>
      <button className={styles.pageSidebar__collapse} onClick={handleClick}>
        <ReactSVG src={SidebarMenuIcon} />
      </button>
      <NavLink to={'/'} className={styles.pageSidebar__logo}>
        <img src={logo} alt={'logo'} />
      </NavLink>
    </div>
  );
};

const PageSidebar: FunctionComponent<PageSidebarProps> = () => {
  const navigate = useNavigate();
  const { sidebarItems } = useAppContext();
  const [open, setOpen] = useState(true);

  // const [activeItem, setActiveItem] = useState<ActiveItem>({ id: '', name: '' });
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   let activeItemId;
  //
  //   if (pathname.length) {
  //     if (pathname.includes('folder') && !pathname.includes('element')) {
  //       const pathArr = pathname.split('/folder/');
  //       activeItemId = pathArr[pathArr.length - 1];
  //     } else if (pathname.includes('favorite')) {
  //       activeItemId = 'favorite';
  //     } else {
  //       activeItemId = 'home';
  //     }
  //
  //     setActiveItem({ id: activeItemId, name: activeItemId });
  //   }
  // }, [pathname]);

  const sidebarClass = clsx(styles.pageSidebar, open ? styles.pageSidebar__open : styles.pageSidebar__collapsed);

  const itemHandler: SidebarItemEvent = (item, e) => {
    e.preventDefault();

    navigate(`/folder/${item.id}`);
  };

  const handleMenuButtonClick = () => {
    setOpen(!open);
  };

  return (
    <Sidebar
      className={sidebarClass}
      headerComponent={<SidebarHeaderComponent handleClick={handleMenuButtonClick} />}
      sidebarItems={sidebarItems}
      sidebarItemClassName={styles.pageSidebar__item}
      sidebarItemClick={itemHandler}
      sidebarSubfolderItemClick={itemHandler}
      sidebarOpen={open}
      // initialActiveItem={{ sidebarItem: activeItem }}
      footerComponent={
        <>
          {PP_CONSTANTS.EXTERNAL_LINKS.map((link) => (
            <a className={styles.pageSidebar__link} key={link.link} href={link.link} target="_blank" rel="noreferrer">
              <SidebarCustomItem
                key={link.name}
                icon={link.icon ? <img src={link.icon} alt={link.name} width="24" height="24" /> : <></>}
              >
                <span className={styles.pageSidebar__linkName}>{link.name}</span>
              </SidebarCustomItem>
            </a>
          ))}
        </>
      }
    >
      <NavLink className={styles.pageSidebar__link} to={'/favorite'}>
        <SidebarNavItem
          className={styles.pageSidebar__item}
          item={{ id: 'favorite', name: 'Favorites', icon: <ReactSVG src={FavoriteIcon} /> }}
        />
      </NavLink>
      <NavLink className={styles.pageSidebar__link} to={'/'}>
        <SidebarNavItem
          className={styles.pageSidebar__item}
          item={{ id: 'home', name: 'Home', icon: <ReactSVG src={HomeIcon} /> }}
        />
      </NavLink>
    </Sidebar>
  );
};

export default PageSidebar;
