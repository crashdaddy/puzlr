import React from 'react'
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Login from './containers/Login'
import PuzzlePicker from './containers/PuzzlePicker';
import Favorites from './containers/Favorites';
import Profile from './containers/Profile';
import LandingPage from './containers/LandingPage';


const Router = () => {
    return (
        <Switch>
            <Route exact path ="/"  render={(props) => <LandingPage {...props}  key={Date.now()} />}/>
            <Route path="/search/:query?" render={(props)=> <PuzzlePicker {...props} key={Date.now()} />}/>
            {/* <Route path="/about" component={About} /> */}
            <Route path="/puzzle/:id?" render={(props) => <App {...props}  key={Date.now()} />}/>
            <Route path="/login" component={Login}/>
            <Route path="/faves" component={Favorites}/>
                {/* <ProtectedRoute path="/profile/:user" render={(props) => <Profile {...props} key={Date.now()} />} /> */}
            <Route path="/profile/:user" render={(props)=> <Profile {...props}/>} />
            <Route path="/help"  render={(props) => <LandingPage {...props}  key={Date.now()} />}/>
        </Switch>
    )
}

// Start Router function here //
export default Router
