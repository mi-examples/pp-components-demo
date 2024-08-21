import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalBody, ModalClose, ModalHeader, ModalTitle } from '@metricinsights/pp-components';
import { useAppContext } from '@/app-context';
import { getInternalType, InternalElementType } from '@/helpers/elements.helper';

import styles from './element.module.scss';

const Element: FunctionComponent = () => {
  const { elementId, segmentId } = useParams<{ elementId: string; segmentId: string }>();

  const { elementsMap, loading } = useAppContext();

  const element = elementId && elementsMap?.get(`${elementId}_${segmentId || 0}`);

  const navigate = useNavigate();

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [headerRef, setHeaderRef] = useState<HTMLDivElement | null>(null);

  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [iframeSize, setIframeSize] = useState<{ width: number; height: number } | null>(null);

  const body = document.querySelector('body');

  useEffect(() => {
    if (body) {
      body.classList.add('noscroll');
    }

    return () => {
      if (body) {
        body.classList.remove('noscroll');
      }
    };
  }, [body]);

  useEffect(() => {
    if (iframeSize && elementId && segmentId && element) {
      const internalType = getInternalType(element.element_type);

      const elementSrc = `element/${elementId}/segment/${segmentId}`;
      const widthSrc = `width/${(iframeSize.width << 0) - 35}`;
      const heightSrc = `height/${(iframeSize.height << 0) - 35}`;

      if (internalType === InternalElementType.Report) {
        setIframeSrc(`/service/iframe/index/type/viewer/${elementSrc}/${widthSrc}/${heightSrc}`);
      } else {
        setIframeSrc(`/${internalType}/index/preview/${elementSrc}/${widthSrc}/${heightSrc}`);
      }
    }
  }, [elementId, segmentId, iframeSize, element]);

  useEffect(() => {
    if (contentRef && headerRef) {
      const width = contentRef.clientWidth;
      const height = contentRef.clientHeight - headerRef.clientHeight;

      setIframeSize({ width, height });
    }
  }, [contentRef, headerRef]);

  if (!loading && !element) {
    navigate({ pathname: '/error404' }, { replace: true });

    return '';
  }

  const onClose = () => {
    navigate(-1);
  };

  return element ? (
    <Modal
      isOpen={true}
      onClose={onClose}
      style={{ minWidth: '80%', minHeight: '80%' }}
      overlayClassName={styles.elementPage__overlay}
    >
      <div style={{ flex: 'content', width: '100%' }} ref={setContentRef}>
        <div ref={setHeaderRef}>
          <ModalHeader>
            <ModalTitle text={element.element_dashboard_name} />
            <ModalClose onClose={onClose} />
          </ModalHeader>
        </div>
        <ModalBody>
          {iframeSize && iframeSrc ? (
            <iframe
              style={{ width: iframeSize.width, height: iframeSize.height, border: 'none' }}
              name="frame"
              frameBorder={0}
              src={iframeSrc}
            ></iframe>
          ) : (
            ''
          )}
        </ModalBody>
      </div>
    </Modal>
  ) : (
    ''
  );
};

export default Element;
