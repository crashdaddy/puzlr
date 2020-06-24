import React from 'react'
import { Switch, Route } from 'react-router';
// import About from './components/About'
import App from './containers/App';
import Login from './containers/Login'
import PuzzlePicker from './containers/PuzzlePicker';

const Router = () => {
    return (
        <Switch>
            <Route exact path ="/" component={PuzzlePicker} />
            <Route path="/search/:query?" render={(props)=> <PuzzlePicker {...props} key={Date.now()} />}/>
            {/* <Route path="/about" component={About} /> */}
            <Route path="/puzzle/:id?" render={(props) => <App {...props} key={Date.now()}/>}/>
            <Route path="/login" component={Login}/>
        </Switch>
    )
}

// Start Router function here //
export default Router
