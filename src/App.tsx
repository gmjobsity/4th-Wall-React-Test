import React, { Suspense } from 'react';
import Loader from 'shared/components/loader';
import Routes from './routes';

import './App.scss';

function App() {

  return <Suspense fallback={<Loader />}>
    <Routes />
  </Suspense>
}

export default App;
