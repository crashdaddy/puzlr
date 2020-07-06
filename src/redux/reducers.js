import { combineReducers } from 'redux'

const player = (state = null,action) => {
    switch(action.type) {
        case 'ADD_USER':
            return action.value;
        case 'LOGOFF':
            return null
        default:
            return state;
    }
}

const puzzle = (state = null, action) => {
    switch(action.type) {
        case 'ADD_PUZZLE':
            return action.value;
        case 'CLEAR_PUZZLE':
            return null
        default:
            return state;
    }}

const navTalk = (state="You aren't logged in", action) => {
    switch(action.type) {
        case 'SET_TEXT':
           return action.value;
        default:
            return state;
    }
}

export default combineReducers({ player,puzzle, navTalk })
