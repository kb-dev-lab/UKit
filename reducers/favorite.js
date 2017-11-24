import  {ADD_TO_FAVORITE} from "../actions/addToFavorite";

let cloneObject = function (obj){
    return JSON.parse(JSON.stringify(obj));
};

let newState = {favorite : {groupName : null}};

export default function (state, action){
    switch(action.type){
        case ADD_TO_FAVORITE:
            newState = cloneObject(state);
            newState = {favorite: {groupName : action.groupName}};
            return newState;
        default:
            return state || newState;
    }
}