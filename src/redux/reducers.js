import { combineReducers } from 'redux'

const player = (state = null,action) => {
    switch(action.type) {
        case 'ADD_USER':
            return action.value;
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

export default combineReducers({ player,puzzle })
