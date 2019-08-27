import { SET_LANGUAGE } from '../actions/setLanguage';

export default function(state = 'fr', action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return action.language;
        default:
            return state;
    }
}
