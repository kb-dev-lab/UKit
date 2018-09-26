import { SET_FILTERS } from '../actions/setFilters';

export default function(state = { filters: [] }, action) {
    switch (action.type) {
        case SET_FILTERS:
            return { filters: action.filters };
        default:
            return state;
    }
}
