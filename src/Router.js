import React from 'react'
import { Switch, Route } from 'react-router';
// import About from './components/About'
import App from './components/gameBoard/App';
import PuzzlePicker from './components/puzzlePicker/PuzzlePicker';

const Router = () => {
    return (
        <Switch>
            <Route exact path ="/" component={PuzzlePicker} />
            <Route path="/search/:query?" component={PuzzlePicker} />
            {/* <Route path="/about" component={About} /> */}
            <Route path="/puzzle/:id" component={App} />
        </Switch>
    )
}

// Start Router function here //
export default Router
