import { RouteObject } from 'react-router-dom';
import Folder from '@pages/folder';
import Element from '@pages/element';

const folderRoutes: RouteObject[] = [
  {
    path: '/folder/:folderId',
    id: 'folder',
    element: <Folder />,
    children: [
      {
        path: 'element/:elementId/:segmentId',
        id: 'folder-element',
        element: <Element />,
      },
    ],
  },
];

export default folderRoutes;
