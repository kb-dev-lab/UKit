import { TOGGLE_DARK_MODE } from '../actions/toggleDarkMode';

export default function(state = { status: false, themeName: 'light' }, action) {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return { status: !state.status, themeName: !state.status ? 'dark' : 'light' };
        default:
            return state;
    }
}
