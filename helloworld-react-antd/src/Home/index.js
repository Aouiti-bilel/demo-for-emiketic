import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HomeView from './HomeView';
import ProductDetails from './components/product/ProductDetails';

function Home() {
  return (
    <Switch>
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/product/:id" component={ProductDetails} />
    </Switch>
  );
}

export default Home;
