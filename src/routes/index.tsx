import React, {FC, lazy, PropsWithChildren, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { BaseLayoutComponent } from 'pages/base/base';
import Loader from 'shared/components/loader';

const MainRouteComponent:FC<PropsWithChildren> = (props) => {
  const Component = lazy(()=>
    import('../pages/mainpage' /* webpackChunkName: 'mainpage' */)
  );

  return <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>;
};

const RoutesComponent:FC = ()=>
  <Router>
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayoutComponent>
              <MainRouteComponent />
            </BaseLayoutComponent>
          }
        />
      </Routes>
  </Router>;

export default RoutesComponent;
