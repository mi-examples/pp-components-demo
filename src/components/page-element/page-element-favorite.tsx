import { FolderElement } from '@/api/folder-element';
import { FunctionComponent, useState } from 'react';
import { useAppContext } from '@/app-context';
import { ElementFavorite } from '@metricinsights/pp-components';
import { apiAddElementToFavorite, apiDeleteFavoriteElement } from '@/api/favorite-element';

import styles from '@/components/page-element/page-element.module.scss';

export interface PageElementFavoriteProps {
  element: FolderElement;
  hidden?: boolean;
  disabled?: boolean;
}

const PageElementFavorite: FunctionComponent<PageElementFavoriteProps> = ({ element, hidden, disabled }) => {
  const { favoriteFolder, favoriteElementsMap, setFavoriteElementsMap } = useAppContext();

  const favoriteElement = favoriteElementsMap.get(`${element.element_id}_${element.segment_value_id ?? 0}`);

  const [inFavorite, setInFavorite] = useState<boolean>(
    favoriteElement ? favoriteElement.favorite_id === favoriteFolder?.id : false,
  );

  const onFavoriteChange = async (favorite: boolean) => {
    if (!favoriteFolder) {
      return;
    }

    if (inFavorite === favorite) {
      return;
    }

    if (favorite) {
      setInFavorite(true);

      favoriteElementsMap.set(`${element.element_id}_${element.segment_value_id ?? 0}`, {
        element_id: element.element_id,
        segment_value_id: element.segment_value_id ?? '0',
        favorite_id: favoriteFolder.id,
      });

      await apiAddElementToFavorite(favoriteFolder.id, element.element_id, element.segment_value_id ?? '0')
        .then(() => {
          setFavoriteElementsMap((prev) => {
            return new Map(prev);
          });
        })
        .catch(() => {
          setInFavorite(false);

          setFavoriteElementsMap((prev) => {
            const newMap = new Map(prev);

            newMap.delete(`${element.element_id}_${element.segment_value_id ?? 0}`);

            return newMap;
          });
        });
    } else {
      setInFavorite(false);

      favoriteElementsMap.delete(`${element.element_id}_${element.segment_value_id ?? 0}`);

      await apiDeleteFavoriteElement(favoriteFolder.id, element.element_id, element.segment_value_id ?? '0')
        .then(() => {
          setFavoriteElementsMap((prev) => {
            return new Map(prev);
          });
        })
        .catch(() => {
          setInFavorite(true);

          setFavoriteElementsMap((prev) => {
            return new Map([
              ...prev,
              [
                `${element.element_id}_${element.segment_value_id ?? 0}`,
                {
                  element_id: element.element_id,
                  segment_value_id: element.segment_value_id ?? '0',
                  favorite_id: favoriteFolder.id,
                },
              ],
            ]);
          });
        });
    }
  };

  return (
    <ElementFavorite
      initialFavorite={inFavorite}
      onFavoriteChange={onFavoriteChange}
      style={{ visibility: hidden ? 'hidden' : 'visible', pointerEvents: disabled ? 'none' : 'auto' }}
      className={styles.pageElement__favorite}
    />
  );
};

export default PageElementFavorite;
