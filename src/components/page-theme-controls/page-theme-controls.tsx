import { useContext } from 'react';

import { ThemeContext } from '@/context/theme-context';
import { THEME_CONSTANTS } from '@/constants';

import styles from './page-theme-controls.module.scss';
import clsx from 'clsx';

type ControlItem = {
  key: string;
  label: string;
};

const items: ControlItem[] = [
  {
    key: THEME_CONSTANTS.MAIN_THEME,
    label: 'Light blue',
  },
  {
    key: THEME_CONSTANTS.SECONDARY_THEME,
    label: 'Purple',
  },
];

const PageThemeControls = () => {
  const { mainTheme, toggleTheme } = useContext(ThemeContext);

  const inputActiveClass = clsx(styles.theme__input, styles.active);

  const handleClick = (key: string) => {
    if (key !== mainTheme) {
      toggleTheme(key);
    }
  };

  return (
    <ul className={styles.theme}>
      {items.map((item) => {
        const { key, label } = item;

        return (
          <li key={key}>
            <label className={mainTheme === key ? inputActiveClass : styles.theme__input}>
              {label}
              <input
                type="radio"
                value={key}
                checked={mainTheme === key}
                onChange={(e) => handleClick(e.target.value)}
              />
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default PageThemeControls;
