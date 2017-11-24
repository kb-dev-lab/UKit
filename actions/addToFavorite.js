export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';

export function addToFavorite(groupName) {
    return {type: ADD_TO_FAVORITE, groupName};
}