import { RouteObject } from 'react-router-dom';
import NotFound from '@pages/not-found';

const errorRoutes: RouteObject[] = [
  {
    path: '/error404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default errorRoutes;
