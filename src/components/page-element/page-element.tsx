import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';

import {
  Element,
  ElementBody,
  ElementControl,
  ElementControlItem,
  ElementHeader,
  ElementPreview,
  ElementTitle,
} from '@metricinsights/pp-components';

import { FolderElement } from '@/api/folder-element';
import { buildElementPreviewUrl } from '@/helpers/elements.helper';
import PageElementFavorite from '@/components/page-element/page-element-favorite';
import ElementInfoPopup from '@/components/element-info-popup/element-info-popup';

import infoIcon from '@/assets/img/icon-info.svg';
import certificateIcon from '@/assets/img/icon-certificate.svg';

import styles from './page-element.module.scss';

export interface PageElementProps {
  element: FolderElement;
}

export type TargetPosition = {
  left: number;
  top: number;
};

const PageElement: FunctionComponent<PageElementProps> = ({ element }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [popupHover, setPopupHover] = useState<boolean>(false);
  const [infoHover, setInfoHover] = useState<boolean>(false);
  const [targetPosition, setTargetPosition] = useState<TargetPosition>({ left: 0, top: 0 });

  const navigate = useNavigate();

  const previewImageURL = useMemo(() => {
    return buildElementPreviewUrl(element, { ttl: 600 });
  }, [element]);

  useEffect(() => {
    if (popupHover || infoHover) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [popupHover, infoHover]);

  return (
    <div className={styles.pageElement}>
      <Element variant="tile" className={styles.pageElement__elementTile}>
        <ElementHeader className={styles.pageElement__header}>
          <PageElementFavorite
            element={element}
            hidden={element.has_access !== 'Y'}
            disabled={element.has_access !== 'Y'}
          />
          <ElementControl>
            <ElementControlItem
              alt={'additional information icon'}
              onMouseEnter={(e: React.MouseEvent) => {
                if (e) {
                  setTargetPosition({ left: e.pageX, top: e.pageY });
                }

                setInfoHover(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setInfoHover(false);
                }, 300);
              }}
            >
              {element.certified_ind === 'N' ? <ReactSVG src={infoIcon} /> : <ReactSVG src={certificateIcon} />}
            </ElementControlItem>
          </ElementControl>
        </ElementHeader>

        <ElementBody
          onClick={() => navigate(`./element/${element.element_id}/${element.segment_value_id ?? 0}`)}
          className={styles.pageElement__body}
        >
          <ElementTitle text={element.element_dashboard_name} className={styles.pageElement__elementTitle} />

          <ElementPreview
            src={previewImageURL}
            alt={element.element_dashboard_name}
            className={styles.pageElement__previewImage}
            imgComponentRender={(props) => {
              return <LazyLoadImage {...props} />;
            }}
          />
        </ElementBody>
      </Element>

      {showInfo && (
        <ElementInfoPopup elementData={element} targetPosition={targetPosition} setPopupHover={setPopupHover} />
      )}
    </div>
  );
};

export default PageElement;
