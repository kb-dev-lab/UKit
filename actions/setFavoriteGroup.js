export const SET_FAVORITE_GROUP = 'SET_FAVORITE_GROUP';

export function setFavoriteGroup(groupName) {
    return {type: SET_FAVORITE_GROUP, groupName};
}