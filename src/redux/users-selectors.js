import { createSelector } from 'reselect';

//примитивный селектор
const getUsersSelector = (state) => {
    return state.usersPage.users;
}

//селектор для вычисления сложных операций из библиотеки reselect (не вызывает каждый раз render при запуске mapStateToProps, 
//вызов идет только если меняются данные из примитивного селектора)
export const getUsers = createSelector(getUsersSelector, (users) => { return users.filter(u => true) }); 

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

