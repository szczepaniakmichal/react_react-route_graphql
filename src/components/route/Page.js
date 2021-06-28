import React from "react";
import { Route, Switch } from 'react-router-dom';

import { HomePage } from "../../pages/HomePage";
import { ContinentsList } from "../../pages/ContinentsList";
import { Continent } from "../../pages/Continent";
import { Error } from "../../pages/Error";

export const Page = () => (
    <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/continents' exact component={ContinentsList}/>
        <Route path='/continents/:code' component={Continent}/>
        <Route component={Error}/>
    </Switch>
);