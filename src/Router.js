import React from 'react'
import { Switch, Route } from 'react-router';
// import About from './components/About'
import App from './containers/App';
import Login from './containers/Login'
import PuzzlePicker from './containers/PuzzlePicker';
import Favorites from './containers/Favorites';
import Profile from './containers/Profile';
import LandingPage from './components/LandingPage/LandingPage';

const Router = () => {
    return (
        <Switch>
            <Route exact path ="/" component={LandingPage} />
            <Route path="/search/:query?" render={(props)=> <PuzzlePicker {...props} key={Date.now()} />}/>
            {/* <Route path="/about" component={About} /> */}
            <Route path="/puzzle/:id?" render={(props) => <App {...props}  key={Date.now()} />}/>
            <Route path="/login" component={Login}/>
            <Route path="/faves" component={Favorites}/>
            <Route path="/profile/:user" component={Profile} />
            <Route path="/help" component={LandingPage} />
        </Switch>
    )
}

// Start Router function here //
export default Router
