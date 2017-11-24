import {SET_FAVORITE_GROUP} from "../actions/setFavoriteGroup";

export default function (state = {groupName: null}, action) {
    switch (action.type) {
        case SET_FAVORITE_GROUP:
            return {groupName: action.groupName};
        default:
            return state;
    }
}