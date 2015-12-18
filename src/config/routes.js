import React from 'react';
import Main from '../components/main';
import Home from '../components/home';
import Profile from '../components/profile';
import { Router, Route, IndexRoute } from 'react-router';

module.exports = (
    <Route path="/" component={ Main }>
        <Route path="profile/:username" component={ Profile } />
        <IndexRoute component={ Home } />
    </Route>
)
