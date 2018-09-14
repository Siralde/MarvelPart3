import { combineReducers } from 'redux';
import selected from './selected';
import characters from './characters';
import comics from './comics';

export default combineReducers ({
    selected,
    characters,
    comics
})
