import { RouteObject } from 'react-router-dom';
import Element from '@pages/element';
import Favorite from '@pages/favorite';

const favoriteRoutes: RouteObject[] = [
  {
    path: '/favorite',
    id: 'favorite',
    element: <Favorite />,
    children: [
      {
        path: 'element/:elementId/:segmentId',
        id: 'favorite-element',
        element: <Element />,
      },
    ],
  },
];

export default favoriteRoutes;
