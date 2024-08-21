import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { InfoPopup, InfoPopupSection, Tag } from '@metricinsights/pp-components';

import { useAppContext } from '@/app-context';
import { FolderElement } from '@/api/folder-element';
import { TargetPosition } from '@/components/page-element/page-element';

import UserIcon from '@/assets/img/icon-user.svg';
import EngagementIcon from '@/assets/img/icon-engagement.svg';
import TagsIcon from '@/assets/img/icon-tags.svg';

import styles from './element-info-popup.module.scss';

type ElementInfoPopupProps = {
  elementData: FolderElement;
  targetPosition: TargetPosition;
  setPopupHover: (value: boolean) => void;
};

type ElementTopic = {
  id: string;
  name: string;
};

const ElementInfoPopup = (props: ElementInfoPopupProps) => {
  const { elementData, targetPosition, setPopupHover } = props;
  const {
    element_info,
    business_owner,
    business_owner_email,
    technical_owner,
    technical_owner_email,
    total_view_count,
  } = elementData;

  const { topics } = useAppContext();

  const [topPosition, setTopPosition] = useState<number>(-50);
  const [rightPosition, setRightPosition] = useState<number>(-260);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [elementTopics, setElementTopics] = useState<ElementTopic[]>([]);
  const [sections, setSections] = useState<InfoPopupSection[]>([]);

  // set info-popup position
  useEffect(() => {
    if (window.innerWidth - targetPosition.left < 300) {
      setRightPosition(20);
    }

    if (window.innerHeight - targetPosition.top < 300) {
      setTopPosition(-200);
    }

    setIsShown(true);
  }, []);

  //  set element topics
  useEffect(() => {
    if (elementData.topics?.length && topics?.length) {
      const topicsArray = elementData.topics.split(',');

      const currentTopicsData = topics.filter((elementTopic) => {
        const topicData = topicsArray.find((topic) => topic === elementTopic.id);

        if (topicData !== undefined) {
          return topicData;
        }
      });

      setElementTopics(currentTopicsData);
    }
  }, [topics]);

  // set info-popup content
  useEffect(() => {
    const sections: InfoPopupSection[] = [];

    if (element_info) {
      sections.push([
        {
          content: element_info,
        },
      ]);
    }

    sections.push(
      [
        {
          icon: elementTopics.length ? <img src={TagsIcon} alt={'icon'} /> : undefined,
          content: elementTopics.length ? (
            <div className={styles.info__tagWrapper}>
              {elementTopics.map((topic) => {
                const { id, name } = topic;

                return <Tag key={id} id={id} name={name} className={styles.info__tag} />;
              })}
            </div>
          ) : undefined,
        },
        {
          icon: <img src={UserIcon} alt={'icon'} />,
          title: 'Business Owner:',
          content: <a href={`mailto:${business_owner_email}`}>{business_owner}</a>,
        },
        {
          icon: <img src={UserIcon} alt={'icon'} />,
          title: 'Technical Owner:',
          content: <a href={`mailto:${technical_owner_email}`}>{technical_owner}</a>,
        },
        {
          icon: <img src={EngagementIcon} alt={'icon'} />,
          title: 'Engagement:',
          content: <span>{total_view_count}</span>,
        },
      ].filter((item) => item.content !== undefined) as InfoPopupSection,
    );

    setSections(sections);
  }, [elementData]);

  const wrapperClass = clsx(styles.info__wrapper, isShown && styles.show);

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => setPopupHover(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setPopupHover(false);
        }, 300)
      }
      style={{ top: topPosition, right: rightPosition }}
    >
      <InfoPopup sections={sections} className={styles.info__block} />
    </div>
  );
};

export default ElementInfoPopup;
