import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinkID from './pages/DrinkID';
import FoodID from './pages/FoodID';
import Profile from './pages/Profile';
import DrinkInProgress from './pages/DrinkInProgress';
import FoodInProgress from './pages/FoodInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/foods/:id" component={ FoodID } />
        <Route path="/drinks/:id" component={ DrinkID } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/foods/:id/in-progress" component={ FoodInProgress } />
        <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      </Switch>
    </div>
  );
}

export default App;
