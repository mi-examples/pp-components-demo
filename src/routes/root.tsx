import { RouteObject } from 'react-router-dom';
import Home from '../components/pages/home';
import Element from '../components/pages/element';
import BaseLayout from '@layouts/base';
import folderRoutes from '@/routes/folder';
import favoriteRoutes from '@/routes/favorite';
import errorRoutes from '@/routes/error';

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    id: 'home',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        id: 'home-root',
        element: <Home />,
        children: [
          {
            path: 'element/:elementId/:segmentId',
            id: 'home-element',
            element: <Element />,
          },
        ],
      },
      ...folderRoutes,
      ...favoriteRoutes,
      ...errorRoutes,
    ],
  },
];

export default rootRoutes;
