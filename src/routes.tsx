import React, { Suspense, lazy, Fragment, LazyExoticComponent, ExoticComponent, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/Main';

type Routes = {
  path: string;
  element: LazyExoticComponent<any>;
  layout?: ({}: any) => JSX.Element;
};

export const routes: Routes[] = [
  // {
  //   path: '/',
  //   element: lazy(() => import('./views/home')),
  //   layout: ManageLayout,
  // },
  // {
  //   path: '/home',
  //   element: lazy(() => import('./views/home')),
  //   layout: ManageLayout,
  // },
  // {
  //   path: '/login',
  //   element: lazy(() => import('./views/login')),
  //   layout: ManageLayout,
  // },
  {
    path: '/:id',
    element: lazy(() => import('./views/viewer')),
    layout: Fragment,
  },
  // {
  //   path: '/manage',
  //   element: lazy(() => import('./views/manage')),
  //   layout: ManageLayout,
  // },
  {
    path: '*',
    element: lazy(() => import('./views/404')),
    layout: MainLayout,
  },
];

type Props = {};

export function AppRouter({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, i) => {
          const Guard = Fragment;
          const Layout: any = route.layout || Fragment;
          const Element = route.element;
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Element />
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}
