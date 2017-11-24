export const SET_FAVORITE_GROUP = 'SET_FAVORITE_GROUP';

export function setFavoriteGroup(groupName) {
    console.log('setFav');
    return {type: SET_FAVORITE_GROUP, groupName};
}