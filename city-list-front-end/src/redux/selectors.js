export const cityListSelector = state => state.citylist.get('citylist');
export const cityListPaginationSelector = state => state.citylist.get('pagination');
export const cityListFilterSelector = state => state.citylist.get('filter');
export const getCityListInProgressFilter = state => state.citylist.get('getCityListInProgress');

export const citySelector = state => state.city.get('city');
export const cityChangedSelector = state => state.city.get('isChanged');
export const saveInProgressSelector = state => state.city.get('saveInProgress');

export const userSelector = state => state.auth.get('user');
