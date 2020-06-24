import React from 'react'
import { Switch, Route } from 'react-router';
// import About from './components/About'
import App from './containers/App';
import PuzzlePicker from './containers/PuzzlePicker';

const Router = () => {
    return (
        <Switch>
            <Route exact path ="/" component={PuzzlePicker} />
            <Route path="/search/:query?" component={PuzzlePicker} />
            {/* <Route path="/about" component={About} /> */}
            <Route path="/puzzle/:id?" render={(props) => <App {...props} key={Date.now()}/>}/>
        </Switch>
    )
}

// Start Router function here //
export default Router
